"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MusicPlayer, type MusicTrack } from "@/component/ui/music-player";
import WaveGridBackground from "@/component/WaveGridBackground";

// Each entry is a complete, editable article. Add or remove a JSX fragment to
// add or remove a slide. Write any HTML/JSX inside it: headings, images, video,
// links, and other components are all supported.
