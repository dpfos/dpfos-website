import {
  resolveKnowledgeContext,
} from "../context/context-resolver.js";

import {
  buildDPFPrompt,
} from "../context/prompt-builder.js";

import {
  buildClubContext,
} from "../context/club-context.js";


export class ClubAgent {
  constructor({
    model,
    adapter,
  }) {
    if (!model) {
      throw new Error(
        "AI model is required."
      );
    }

    if (!adapter) {
      throw new Error(
        "AI adapter is required."
      );
    }

    this.model = model;
    this.adapter = adapter;
  }


  analyzeRequest(userPrompt) {
    const prompt =
      userPrompt.toLowerCase();

    let intent = "general";

    if (
      prompt.includes("training") ||
      prompt.includes("session") ||
      prompt.includes("practice") ||
      prompt.includes("تدريب") ||
      prompt.includes("حصة")
    ) {
      intent = "training";
    }

    if (
      prompt.includes("player") ||
      prompt.includes("development") ||
      prompt.includes("لاعب") ||
      prompt.includes("تطوير")
    ) {
      intent = "player_development";
    }

    if (
      prompt.includes("scouting") ||
      prompt.includes("scout") ||
      prompt.includes("recruit") ||
      prompt.includes("استكشاف") ||
      prompt.includes("تعاقد")
    ) {
      intent = "scouting";
    }

    if (
      prompt.includes("performance") ||
      prompt.includes("physical") ||
      prompt.includes("أداء")
    ) {
      intent = "performance";
    }

    if (
      prompt.includes("game model") ||
      prompt.includes("game-model") ||
      prompt.includes("نموذج اللعب")
    ) {
      intent = "game_model";
    }

    if (
      prompt.includes("report") ||
      prompt.includes("reports") ||
      prompt.includes("تقرير")
    ) {
      intent = "reporting";
    }

    return {
      intent,

      requiresAuthoritativeKnowledge:
        true,

      knowledgeStrategy:
        "authoritative-first",
    };
  }


  async run({
    prompt,
    club = null,
    team = null,
    players = [],
    staff = [],
    currentModule = null,
    requestContext = {},
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
    1. REQUEST ANALYSIS
    ----------------------------------------------------------
    */

    const requestAnalysis =
      this.analyzeRequest(prompt);


    /*
    ----------------------------------------------------------
    2. BUILD CLUB CONTEXT
    ----------------------------------------------------------
    */

    const clubContext =
      buildClubContext({
        club,
        team,
        players,
        staff,
        currentModule,
        requestContext,
      });


    /*
    ----------------------------------------------------------
    3. RESOLVE DPF KNOWLEDGE
    ----------------------------------------------------------
    */

    const knowledgeContext =
      resolveKnowledgeContext(
        prompt,
        {
          limit:
            contextOptions.limit ??
            (
              requestAnalysis.intent ===
              "game_model"
                ? 8
                : 5
            ),

          type:
            contextOptions.type ??
            null,

          category:
            contextOptions.category ??
            null,

          domain:
            contextOptions.domain ??
            null,

          status:
            contextOptions.status ??
            null,

          authoritativeOnly:
            contextOptions.authoritativeOnly ??
            true,
        }
      );


    /*
    ----------------------------------------------------------
    4. BUILD DPF-AWARE CLUB PROMPT
    ----------------------------------------------------------
    */

    const dpfPrompt =
      buildDPFPrompt({
        userPrompt: prompt,

        knowledge:
          knowledgeContext.knowledge,

        agent: {
          ...requestAnalysis,

          environment:
            "club_os",

          clubContext,
        },
      });


    /*
    ----------------------------------------------------------
    5. GENERATE
    ----------------------------------------------------------
    */

    const result =
      await this.adapter.generate(
        dpfPrompt
      );


    /*
    ----------------------------------------------------------
    6. RETURN INTELLIGENCE RESULT
    ----------------------------------------------------------
    */

    return {
      status: "success",

      environment:
        "club_os",

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
          requestAnalysis
            .requiresAuthoritativeKnowledge,
      },

      clubContext,

      context: {
        query:
          knowledgeContext.query,

        count:
          knowledgeContext.count,

        knowledge:
          knowledgeContext.knowledge,
      },
    };
  }
}