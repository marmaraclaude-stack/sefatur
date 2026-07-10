"use client";

/**
 * motion animasyonlarını kullanıcının "hareketi azalt" tercihine bağlar.
 * reducedMotion="user": tercih açıksa transform/layout animasyonları kapanır.
 */
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
