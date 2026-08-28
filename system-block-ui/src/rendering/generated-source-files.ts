export const GENERATED_SYSTEM_MAIN_FILE_NAME = "GeneratedSystem.circuit.tsx";

export interface GeneratedSystemSourceArtifacts {
  tsx: string;
  systemDiagramFileName: string;
  systemDiagramSvg: string;
}

export interface GeneratedSystemSourceFile {
  fileName: string;
  source: string;
}

/** Returns the electrical source and its separate overview artifact. */
export const getGeneratedSystemSourceFiles = (
  artifacts: GeneratedSystemSourceArtifacts,
): readonly GeneratedSystemSourceFile[] => [
  {
    fileName: GENERATED_SYSTEM_MAIN_FILE_NAME,
    source: artifacts.tsx,
  },
  {
    fileName: artifacts.systemDiagramFileName,
    source: artifacts.systemDiagramSvg,
  },
];
