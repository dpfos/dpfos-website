import dotenv from "dotenv";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DPFEngine } from "./engine/aiEngine.js";
import { ClubAgent } from "./club/club-agent.js";
import { createModelAdapter } from "./engine/model-factory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
============================================================
ENVIRONMENT
============================================================
*/

dotenv.config({
  path: path.resolve(__dirname, "../.env.local"),
});

const PORT =
  process.env.PORT || 8787;

const MODEL_ID =
  process.env.DPF_AI_MODEL ||
  "qwen3.5-4b";

/*
============================================================
AI RUNTIME
============================================================
*/

const adapter =
  createModelAdapter(
    MODEL_ID,
    process.env
  );

const engine =
  new DPFEngine({
    model: MODEL_ID,
    adapter,
  });

const clubAgent =
  new ClubAgent({
    model: MODEL_ID,
    adapter,
  });

/*
============================================================
HTTP HELPERS
============================================================
*/

function sendJson(
  res,
  statusCode,
  data
) {
  res.writeHead(
    statusCode,
    {
      "Content-Type":
        "application/json",

      "Access-Control-Allow-Origin":
        "*",

      "Access-Control-Allow-Methods":
        "GET,POST,OPTIONS",

      "Access-Control-Allow-Headers":
        "Content-Type",
    }
  );

  res.end(
    JSON.stringify(data)
  );
}


function readBody(req) {
  return new Promise(
    (resolve, reject) => {
      let body = "";

      req.on(
        "data",
        (chunk) => {
          body += chunk;

          /*
          ----------------------------------------------------
          BASIC REQUEST SIZE PROTECTION
          ----------------------------------------------------
          */

          if (
            body.length >
            2 * 1024 * 1024
          ) {
            reject(
              new Error(
                "Request body is too large."
              )
            );

            req.destroy();
          }
        }
      );

      req.on(
        "end",
        () => {
          try {
            resolve(
              body
                ? JSON.parse(body)
                : {}
            );
          } catch {
            reject(
              new Error(
                "Invalid JSON body."
              )
            );
          }
        }
      );

      req.on(
        "error",
        reject
      );
    }
  );
}

/*
============================================================
SERVER
============================================================
*/

const server =
  http.createServer(
    async (req, res) => {
      try {

        /*
        ======================================================
        CORS PREFLIGHT
        ======================================================
        */

        if (
          req.method ===
          "OPTIONS"
        ) {
          res.writeHead(
            204,
            {
              "Access-Control-Allow-Origin":
                "*",

              "Access-Control-Allow-Methods":
                "GET,POST,OPTIONS",

              "Access-Control-Allow-Headers":
                "Content-Type",
            }
          );

          return res.end();
        }


        /*
        ======================================================
        HEALTH
        ======================================================
        */

        if (
          req.method === "GET" &&
          req.url === "/health"
        ) {
          return sendJson(
            res,
            200,
            {
              service:
                "dpf-ai-runtime",

              status:
                "ok",

              version:
                "1.0.0",

              provider:
                adapter.provider,

              model:
                MODEL_ID,

              local:
                true,

              capabilities: {
                general:
                  true,

                clubOS:
                  true,
              },
            }
          );
        }


        /*
        ======================================================
        GENERAL DPF GENERATION
        ======================================================
        */

        if (
          req.method === "POST" &&
          req.url === "/generate"
        ) {
          const body =
            await readBody(req);

          if (
            !body.prompt ||
            typeof body.prompt !==
              "string"
          ) {
            return sendJson(
              res,
              400,
              {
                error:
                  "Prompt must be a non-empty string.",
              }
            );
          }

          const result =
            await engine.run({
              prompt:
                body.prompt,

              contextOptions: {
                limit:
                  body.contextLimit ??
                  5,

                type:
                  body.type ??
                  null,

                category:
                  body.category ??
                  null,

                domain:
                  body.domain ??
                  null,

                status:
                  body.status ??
                  null,

                authoritativeOnly:
                  body.authoritativeOnly ??
                  true,
              },
            });

          return sendJson(
            res,
            200,
            result
          );
        }


        /*
        ======================================================
        CLUB OS GENERATION
        ======================================================
        */

        if (
          req.method === "POST" &&
          req.url === "/club/generate"
        ) {
          const body =
            await readBody(req);

          if (
            !body.prompt ||
            typeof body.prompt !==
              "string"
          ) {
            return sendJson(
              res,
              400,
              {
                error:
                  "Prompt must be a non-empty string.",
              }
            );
          }


          /*
          ----------------------------------------------------
          CLUB AGENT
          ----------------------------------------------------
          */

          const result =
            await clubAgent.run({

              prompt:
                body.prompt,

              club:
                body.club ??
                null,

              team:
                body.team ??
                null,

              players:
                Array.isArray(
                  body.players
                )
                  ? body.players
                  : [],

              staff:
                Array.isArray(
                  body.staff
                )
                  ? body.staff
                  : [],

              currentModule:
                body.currentModule ??
                null,

              requestContext:
                body.requestContext ??
                {},

              contextOptions: {
                limit:
                  body.contextLimit ??
                  5,

                type:
                  body.type ??
                  null,

                category:
                  body.category ??
                  null,

                domain:
                  body.domain ??
                  null,

                status:
                  body.status ??
                  null,

                authoritativeOnly:
                  body.authoritativeOnly ??
                  true,
              },
            });


          return sendJson(
            res,
            200,
            result
          );
        }


        /*
        ======================================================
        404
        ======================================================
        */

        return sendJson(
          res,
          404,
          {
            error:
              "Route not found",
          }
        );

      } catch (error) {

        console.error(
          "DPF AI Runtime error:",
          error
        );

        return sendJson(
          res,
          500,
          {
            error:
              error.message ||
              "Internal server error.",
          }
        );
      }
    }
  );


/*
============================================================
START
============================================================
*/

server.listen(
  PORT,
  () => {

    console.log(
      `DPF AI Runtime listening on http://localhost:${PORT}`
    );

    console.log(
      `Provider: ${adapter.provider}`
    );

    console.log(
      `Model: ${MODEL_ID}`
    );

    console.log(
      `Club OS Agent: enabled`
    );
  }
);