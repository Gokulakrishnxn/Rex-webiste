
import { Activity, Shield, Lightbulb, Users, Zap, TrendingUp } from "lucide-react";

export function About() {
    return (
        <section id="about" className="container py-24 md:py-32 space-y-24">
            {/* Intro & Mission */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">
                        We're building the future of clinical documentation.
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Rex empowers healthcare professionals to spend less time on paperwork and more time with patients. We believe that doctors should practice medicine, not administration.
                    </p>
                </div>
                <div id="our-mission" className="space-y-6 p-8 bg-muted/30 rounded-3xl border border-border/50">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        To transform clinical documentation through ambient AI, enabling healthcare professionals to reclaim their time, improve patient care, and reduce burnout.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif">Our Values</h2>
                    <p className="text-muted-foreground text-lg">
                        The core principles that guide every decision we make at Rex.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Value 1 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Activity className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Patient-Centric</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Every feature we build starts with one question: does this improve patient care? We measure success by the time clinicians save and the outcomes they achieve.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Lightbulb className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Innovation-Driven</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We leverage cutting-edge AI and machine learning to solve real problems. But we never sacrifice accuracy or reliability for speed.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Privacy First</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Healthcare data is sacred. We design security into every layer of our product, from encryption to audit logs to data residency controls.
                        </p>
                    </div>

                    {/* Value 4 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">User-Obsessed</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We talk to clinicians constantly. Their feedback shapes our roadmap. We ship features that solve real workflow problems, not vanity features.
                        </p>
                    </div>

                    {/* Value 5 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Ambitious</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We're not here to build a small tool. We're building the ambient AI assistant that every healthcare team will use every day.
                        </p>
                    </div>

                    {/* Value 6 */}
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-background border border-border/50 hover:border-border/80 transition-colors shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Proactive</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We act before problems grow. Rex turns data into foresight—early alerts, smart reminders, better outcomes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
