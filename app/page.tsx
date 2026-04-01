"use client";


import Introduction from "./component/Introduction";
import { ContributionGraph } from "./component/ContributionGraph";
import { Objective } from "./component/Objective";
import { TerminalSection } from "./component/TerminalSection";
import { SystemSnapshot } from "./component/SystemSnapshot";
import { ScienceFlavor } from "./component/ScienceFlavor";
import { ProjectsSection } from "./component/ProjectsSection";
import { BlogsSection } from "./component/BlogsSection";
import { ResumeSection } from "./component/ResumeSection";
import { TerminalNav } from "./component/TerminalNav";
import { InteractiveTerminal, type TerminalView } from "./component/InteractiveTerminal";
import { GithubPRsSection } from "./component/GithubPRsSection";
import { DevtoBlogsSection } from "./component/DevtoBlogsSection";
import { TweetsSection } from "./component/TweetsSection";
import { useMemo, useState } from "react";
import Footer from "./component/Footer";


export default function Home() {
  const [view, setView] = useState<TerminalView>("home");

  const visible = useMemo(() => (view === "home" ? null : view), [view]);


  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-5 pt-10 pb-24">
        <TerminalNav />
        <Introduction />

        <div className="mt-6 space-y-6">
          <InteractiveTerminal
            onRoute={(v) => {
              setView(v);
              const id = v === "home" ? "hero" : v;
              const el = document.getElementById(id);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />

          <section id="hero" className="scroll-mt-24">
            <TerminalSection title="whoami" subtitle="vishal — senior backend / full-stack / systems">
            <div className="space-y-3 text-sm leading-relaxed text-zinc-200/90">
              <p>
                I design and ship production systems that stay correct under load:
                API design, data modeling, distributed workflows, and boring
                reliability.
              </p>
              <p className="text-zinc-300/90">
                Current focus: backend scalability, system design, cloud-native
                deployment, and measurable performance. Also: I’m a science student
                — I like thinking in experiments, constraints, and repeatable
                proofs.
              </p>
            </div>
            </TerminalSection>
          </section>

          {visible === null || visible === "systems" ? <SystemSnapshot /> : null}
          {visible === null || visible === "science" ? <ScienceFlavor /> : null}
          {visible === null || visible === "objective" ? <Objective /> : null}
          {visible === null || visible === "projects" ? <ProjectsSection /> : null}
          {visible === null || visible === "blogs" ? <BlogsSection /> : null}
          {visible === null || visible === "devto" ? <DevtoBlogsSection /> : null}
          {visible === null || visible === "prs" ? <GithubPRsSection /> : null}
          {visible === null || visible === "tweets" ? <TweetsSection /> : null}
          {visible === null || visible === "about" ? <ResumeSection /> : null}
          {visible === null || visible === "activity" ? <ContributionGraph /> : null}
         
     <Footer/>
        </div>
      </div>

     
    </main>
  );
}
