import { Body } from "matter-js";

export interface CustomBodyDefinition extends Body {
    name?: string;
    bgColor?: string;
    textColor?: string;
  }