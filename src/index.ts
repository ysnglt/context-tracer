import uuid = require("uuid/v1");
import cls = require("cls-hooked");

import { EventEmitter } from "events";

const CONTEXT_ID = "CONTEXT_ID";
const CONTEXT = "CONTEXT";

const context = cls.createNamespace(CONTEXT);

const set = (callback: () => void) => {
  const contextId = uuid();

  context.run(() => {
    context.set(CONTEXT_ID, contextId);
    callback();
  });
};

const get = (): string => {
  const context = cls.getNamespace(CONTEXT);

  let contextId = context.get(CONTEXT_ID)
    ? context.get(CONTEXT_ID)
    : "no context";
  return contextId;
};

export = { set, get };
