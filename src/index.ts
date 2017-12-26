import cls = require("cls-hooked");
import uuid = require("uuid");

import { EventEmitter } from "events";

const CONTEXT_ID = "CONTEXT_ID";
const CONTEXT = "CONTEXT";

const context = cls.createNamespace(CONTEXT);

const set = (callback: () => void) => {
  const contextId = uuid.v1();

  context.run(() => {
    context.set(CONTEXT_ID, contextId);
    callback();
  });
};

const get = (): string => {
  const currentContext = cls.getNamespace(CONTEXT);
  const contextName = currentContext.get(CONTEXT_ID);

  return contextName ? contextName : "no context";
};

export = { set, get };
