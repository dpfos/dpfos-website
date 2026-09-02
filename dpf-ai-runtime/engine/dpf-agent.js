import { resolveKnowledgeContext } from "../context/context-resolver.js";
import { buildDPFPrompt } from "../context/prompt-builder.js";

export class DPFAgent {
  constructor({
    model,
    adapter,
  }) {
    if (!model) {
      throw new Error("AI model is required.");
    }

    if (!adapter) {
      throw new Error("AI adapter is required.");
    }

    this.model = model;
    this.adapter = adapter;
  }

  analyzeRequest(userPrompt) {
    const prompt = userPrompt.toLowerCase();

    let intent = "general";

    if (
      prompt.includes("what is") ||
      prompt.includes("define") ||
      prompt.includes("definition") ||
      prompt.includes("ما هو") ||
      prompt.includes("يعني ايه") ||
      prompt.includes("اشرح")
    ) {
      intent = "definition";
    }

    if (
      prompt.includes("how") ||
      prompt.includes("كيف") ||
      prompt.includes("ازاي") ||
      prompt.includes("كيفية")
    ) {
      intent = "application";
    }

    if (
      prompt.includes("compare") ||
      prompt.includes("comparison") ||
      prompt.includes("الفرق") ||
      prompt.includes("قارن")
    ) {
      intent = "comparison";
    }

    if (
      prompt.includes("why") ||
      prompt.includes("لماذا") ||
      prompt.includes("ليه")
    ) {
      intent = "explanation";
    }

    if (
      prompt.includes("analyze") ||
      prompt.includes("analysis") ||
      prompt.includes("حلل") ||
      prompt.includes("تحليل")
    ) {
      intent = "analysis";
    }

    return {
      intent,
      requiresAuthoritativeKnowledge: true,
      knowledgeStrategy: "authoritative-first",
    };
  }

  resolveContext(userPrompt, requestAnalysis, contextOptions = {}) {
    return resolveKnowledgeContext(
      userPrompt,
      {
        limit:
          contextOptions.limit ??
          (requestAnalysis.intent === "comparison"
            ? 8
            : 5),

        type:
          contextOptions.type ?? null,

        category:
          contextOptions.category ?? null,

        domain:
          contextOptions.domain ?? null,

        status:
          contextOptions.status ?? null,

        authoritativeOnly:
          contextOptions.authoritativeOnly ??
          requestAnalysis.requiresAuthoritativeKnowledge,
      }
    );
  }

  buildPrompt({
    userPrompt,
    knowledge,
    requestAnalysis,
  }) {
    return buildDPFPrompt({
      userPrompt,
      knowledge,
      agent: requestAnalysis,
    });
  }

  async run({
    prompt,
    contextOptions = {},
  }) {
    if (
      !prompt ||
      typeof prompt !== "string"
    ) {
      throw new Error(
        "Prompt must be a non-empty string."
      );
    }

    /*
    ----------------------------------------------------------
    1. ANALYZE REQUEST
    ----------------------------------------------------------
    */

    const requestAnalysis =
  this.analyzeRequest(prompt);

const context =
  this.resolveContext(
    prompt,
    requestAnalysis,
    contextOptions
  );

    /*
    ----------------------------------------------------------
    2. RESOLVE KNOWLEDGE
    ----------------------------------------------------------
    resolveContext(
  userPrompt,
  requestAnalysis,
  contextOptions = {}
) {
  return resolveKnowledgeContext(
    userPrompt,
    {
      limit:
        contextOptions.limit ??
        (requestAnalysis.intent === "comparison"
          ? 8
          : 5),

      bookId:
        contextOptions.bookId ??
        null,

      status:
        contextOptions.status ??
        null,

      authoritativeOnly:
        contextOptions.authoritativeOnly ??
        requestAnalysis.requiresAuthoritativeKnowledge,
    }
  );
}
    ----------------------------------------------------------
    3. BUILD DPF-AWARE PROMPT
    ----------------------------------------------------------
    */

    const dpfPrompt =
      this.buildPrompt({
        userPrompt: prompt,
        knowledge: context.knowledge,
        requestAnalysis,
      });

    /*
    ----------------------------------------------------------
    4. GENERATE THROUGH MODEL GATEWAY
    ----------------------------------------------------------
    */

    const result =
      await this.adapter.generate(
        dpfPrompt
      );

    /*
    ----------------------------------------------------------
    5. RETURN AGENT RESULT
    ----------------------------------------------------------
    */

    return {
      status: "success",

      provider:
        result.provider ?? null,

      model:
        result.model ??
        this.model,

      text:
        result.text ?? "",

      failover:
        result.failover ?? null,

      failures:
        result.failures ?? [],

      agent: {
        intent:
          requestAnalysis.intent,

        knowledgeStrategy:
          requestAnalysis.knowledgeStrategy,

        authoritativeKnowledge:
          requestAnalysis.requiresAuthoritativeKnowledge,
      },

      context: {
        query:
          context.query,

        count:
          context.count,

        knowledge:
          context.knowledge,
      },
    };
  }
}