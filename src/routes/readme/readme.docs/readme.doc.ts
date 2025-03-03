import { EHttpCode } from "../../../enums";
import { internalError } from "../../../config/swagger/common-errors";

export const readmeDoc = {
  "/": {
    get: {
      description: "Get README html",
      tags: ["Readme"],
      responses: {
        [EHttpCode.OK]: {
          description: "README html page",
          content: {
            "text/html": {},
          },
        },
        [EHttpCode.INTERNAL_ERROR]: internalError,
      },
    },
  },
};
