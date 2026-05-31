import {
  LayoutPanelTop, Server, Database, Braces, Boxes, Cpu,
  GraduationCap, BookOpen, Code2, Workflow, Monitor,
  BsGithub, BsLinkedin, BsTwitter,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutPanelTop, Server, Database, Braces, Boxes, Cpu,
  GraduationCap, BookOpen, Code2, Workflow, Monitor,
};

export function getIcon(name: string) {
  return iconMap[name] || null;
}
