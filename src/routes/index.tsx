import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Bell,
  ChevronRight,
  CircleUserRound,
  Image as ImageIcon,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentProfile, saveCurrentProfile } from "@/lib/profile.functions";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Abhijeets Kingdom — Your private family home" },
      {
        name: "description",
        content: "A warm private home for family calls, conversations, memories, and togetherness.",
      },
      { property: "og:title", content: "Abhijeets Kingdom — Your private family home" },
      {
        property: "og:description",
        content: "Where family is always one call away.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KingdomHome,
});

const navItems = [
  { label: "Home", icon: Sparkles },
  { label: "Chat", icon: MessageCircle },
  { label: "Memories", icon: ImageIcon },
];

function KingdomHome() {
  const saveProfile = useServerFn(saveCurrentProfile);
  const loadProfile = useServerFn(getCurrentProfile);
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [entered, setEntered] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [showNotifications, setShowNotifications] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  useEffect(() => {
    const remembered = window.localStorage.getItem("abhijeets-kingdom-name");
    if (remembered) {
      setName(remembered);
      setEntered(true);
    }
    void loadProfile().then((profile) => {
      if (profile?.display_name) {
        setName(profile.display_name);
        setEntered(true);
        window.localStorage.setItem("abhijeets-kingdom-name", profile.display_name);
      }
    }).catch(() => undefined);
  }, [loadProfile]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }, []);

  async function enterKingdom() {
    const cleanName = draftName.trim();
    if (cleanName.length < 1 || cleanName.length > 80) {
      toast.error("Please enter a name between 1 and 80 characters.");
      return;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }
      await saveProfile({ data: { displayName: cleanName } });
    } catch {
      toast.error("We couldn't save your profile yet. Please try again.");
      return;
    }

    window.localStorage.setItem("abhijeets-kingdom-name", cleanName);
    setName(cleanName);
    setEntered(true);
    toast.success("Welcome to the Kingdom.");
  }

  function sendMessage() {
    const cleanMessage = message.trim();
    if (!cleanMessage || cleanMessage.length > 500) return;
    setSentMessages((current) => [...current, cleanMessage]);
    setMessage("");
    toast.success("Your message was added to this session.");
  }

  if (!entered) {
    return <WelcomeScreen draftName={draftName} setDraftName={setDraftName} onEnter={enterKingdom} />;
  }

  return (
    <div className="kingdom-shell min-h-screen overflow-hidden bg-background text-foreground">
      <DecorativeBackground />
      <div className="relative mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="font-display text-lg font-semibold leading-none tracking-tight">Abhijeets Kingdom</p>
               <p className="mt-1 text-[11px] text-muted-foreground">Your private family space</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 rounded-2xl border border-border/60 bg-card/75 p-1 shadow-sm lg:flex">
            {navItems.map((item) => (
               <Button
                key={item.label}
                variant="ghost"
                className={activeNav === item.label ? "bg-accent text-accent-foreground" : "text-muted-foreground"}
                onClick={() => setActiveNav(item.label)}
              >
                <item.icon />
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open notifications"
              className="relative rounded-2xl bg-card/80 shadow-sm"
              onClick={() => setShowNotifications((current) => !current)}
            >
              <Bell />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-coral" />
            </Button>
            <Button variant="ghost" className="rounded-2xl bg-card/80 pl-1 pr-3 shadow-sm">
              <span className="grid size-8 place-items-center rounded-full bg-plum text-xs font-bold text-primary-foreground">{name[0]?.toUpperCase()}</span>
              <span className="hidden text-sm font-semibold sm:block">{name}</span>
            </Button>
          </div>
        </header>

        {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}

        <main className="pb-8">
          <section className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-coral">{greeting}</p>
              <h1 className="mt-1 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">Welcome back, {name} 👋</h1>
               <p className="mt-3 max-w-xl text-muted-foreground">Your family space is ready for the people and moments you choose to add.</p>
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-3">
             <div className="rounded-[32px] border border-border/60 bg-card/85 p-7 shadow-xl lg:col-span-2">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"><span className="size-2.5 rounded-full bg-muted-foreground/50" /> No active call</div>
               <h2 className="mt-3 font-display text-3xl font-semibold">Family calls</h2>
               <p className="mt-2 max-w-xl text-muted-foreground">An active family call will appear here when someone starts one.</p>
               <div className="mt-6 flex items-center gap-3 rounded-2xl bg-background/70 p-4 text-sm text-muted-foreground"><CircleUserRound className="size-5" /> No other family members are connected yet.</div>
            </div>
            <Radar />
          </section>

          <section className="mt-9">
             <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">Your profile</h2><Button variant="link" className="text-coral" onClick={() => setActiveNav("Chat")}>Open chat <ChevronRight /></Button></div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
               <MemberCard name={name} />
            </div>
          </section>

          <section className="mt-9 grid gap-5 lg:grid-cols-3">
            <MemoryGallery />
             <EmptyFamilyCard />
          </section>

          <section className="mt-9 grid gap-5 lg:grid-cols-5">
            <ChatPreview sentMessages={sentMessages} message={message} setMessage={setMessage} onSend={sendMessage} />
             <EventsPreview />
          </section>
        </main>
        <MobileNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <p className="pb-3 text-center text-xs text-muted-foreground/70">A private home for your family · Abhijeets Kingdom</p>
      </div>
    </div>
  );
}

function WelcomeScreen({ draftName, setDraftName, onEnter }: { draftName: string; setDraftName: (value: string) => void; onEnter: () => void }) {
  return (
    <div className="kingdom-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 text-foreground">
      <DecorativeBackground />
      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-[28px] bg-gradient-to-br from-gold to-coral text-4xl shadow-2xl">♛</div>
        <p className="font-display text-lg font-semibold text-coral">A private home for your family</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">Abhijeets Kingdom</h1>
         <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">A private space for the people and moments you choose to share.</p>
        <div className="mx-auto mt-9 max-w-md rounded-[32px] border border-border/70 bg-card/85 p-6 text-left shadow-2xl backdrop-blur-xl sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Welcome to the Kingdom</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enter your name to join your family space.</p>
          <label className="mt-6 block text-sm font-semibold" htmlFor="family-name">Your name</label>
          <Input id="family-name" autoComplete="name" value={draftName} onChange={(event) => setDraftName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onEnter(); }} placeholder="Enter your name" maxLength={80} className="mt-2 h-12 rounded-2xl border-border/70 bg-background/70" />
          <Button className="mt-4 h-12 w-full rounded-2xl bg-gradient-to-br from-gold to-coral font-display text-base text-foreground shadow-lg hover:brightness-105" onClick={onEnter}>Enter Kingdom <ChevronRight /></Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">Your name is remembered on this device.</p>
        </div>
      </div>
    </div>
  );
}

function DecorativeBackground() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-24 -top-24 size-[360px] rounded-full bg-rose/35 blur-3xl" /><div className="absolute -right-28 top-1/3 size-[420px] rounded-full bg-sky/25 blur-3xl" /><div className="absolute bottom-0 left-1/3 size-[380px] rounded-full bg-gold/25 blur-3xl" /></div>;
}

function BrandMark() { return <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-coral text-2xl shadow-lg">♛</div>; }

function Radar() {
  return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-semibold">Family Radar</h2><span className="rounded-full bg-sage/15 px-2.5 py-1 text-[11px] font-semibold text-sage-foreground">Live</span></div><div className="mt-4 rounded-2xl bg-background/80 p-4"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-sage" /><span className="text-sm font-semibold">You are online</span></div><p className="mt-2 text-sm text-muted-foreground">Other family activity will appear here when it exists.</p></div></div>;
}

function MemberCard({ name }: { name: string }) {
  return <div className="rounded-[26px] border border-border/60 bg-card/85 p-5 shadow-xl transition-transform duration-200 hover:-translate-y-1"><div className="relative grid size-16 place-items-center rounded-full bg-plum text-xl font-bold text-primary-foreground">{name[0]?.toUpperCase()}<span className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-card bg-sage" /></div><p className="mt-4 font-display text-lg font-semibold">{name}</p><p className="text-xs text-muted-foreground">You · Online</p><span className="mt-3 inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">Profile</span></div>;
}

function MemoryGallery() {
  return <div id="memories" className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-2"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-semibold">Family Memories</h2><span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">No memories yet</span></div><div className="mt-5 grid min-h-64 place-items-center rounded-[22px] border border-dashed border-border bg-background/60 p-8 text-center"><div><ImageIcon className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 font-semibold">Your real memories will appear here.</p><p className="mt-1 text-sm text-muted-foreground">No photos have been added yet.</p></div></div></div>;
}

function EmptyFamilyCard() { return <div className="flex flex-col items-center justify-center rounded-[32px] border border-border/60 bg-gradient-to-br from-sky/40 to-plum/30 p-6 text-center shadow-xl"><div className="grid size-20 place-items-center rounded-full bg-card/80 text-4xl shadow-lg"><CircleUserRound /></div><h2 className="mt-4 font-display text-2xl font-semibold">Your family space</h2><p className="mt-1 max-w-xs text-sm text-muted-foreground">No other family members or shared activity have been added yet.</p></div>; }

function ChatPreview({ sentMessages, message, setMessage, onSend }: { sentMessages: string[]; message: string; setMessage: (value: string) => void; onSend: () => void }) { return <div id="chat" className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-3"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-coral">Family Room</p><h2 className="font-display text-2xl font-semibold">Conversations</h2></div><Button variant="ghost" size="icon" aria-label="Open family chat"><MessageCircle /></Button></div><div className="mt-5 space-y-2">{sentMessages.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center"><MessageCircle className="mx-auto size-7 text-muted-foreground" /><p className="mt-2 text-sm font-semibold">No messages yet.</p><p className="mt-1 text-xs text-muted-foreground">Messages you send here are shown for this session.</p></div>}{sentMessages.map((item, index) => <div key={`${item}-${index}`} className="rounded-2xl bg-accent p-3 text-sm"><span className="font-semibold">You</span><span className="text-muted-foreground"> · {item}</span></div>)}</div><div className="mt-5 flex gap-2"><Input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSend(); }} maxLength={500} placeholder="Write a message" className="h-11 rounded-2xl bg-background/70" /><Button aria-label="Send message" size="icon" className="size-11 rounded-2xl bg-coral text-foreground hover:bg-coral/90" onClick={onSend}><Send /></Button></div></div>; }

function EventsPreview() { return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-2"><div><p className="text-sm font-semibold text-coral">Family calendar</p><h2 className="font-display text-2xl font-semibold">Upcoming</h2></div><div className="mt-5 rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center"><p className="text-sm font-semibold">No events yet.</p><p className="mt-1 text-xs text-muted-foreground">Events will appear here after your family adds them.</p></div></div>; }

function NotificationPanel({ onClose }: { onClose: () => void }) { return <div className="absolute right-5 top-20 z-30 w-[min(92vw,360px)] rounded-3xl border border-border/70 bg-card p-4 shadow-2xl sm:right-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-coral">Notifications</p><h2 className="mt-1 font-display text-xl font-semibold">Your notifications</h2></div><Button variant="ghost" size="icon" aria-label="Close notifications" onClick={onClose}><X /></Button></div><div className="mt-4 rounded-2xl border border-dashed border-border bg-background/60 p-5 text-center"><Bell className="mx-auto size-6 text-muted-foreground" /><p className="mt-2 text-sm font-semibold">No notifications yet.</p><p className="mt-1 text-xs text-muted-foreground">New family activity will appear here.</p></div></div>; }

function MobileNav({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (value: string) => void }) { return <nav className="sticky bottom-3 z-20 mx-auto mt-8 flex max-w-md items-center justify-around rounded-2xl border border-border/70 bg-card/90 p-2 shadow-2xl backdrop-blur lg:hidden">{navItems.map((item) => <Button key={item.label} variant="ghost" size="sm" className={activeNav === item.label ? "bg-accent text-accent-foreground" : "text-muted-foreground"} onClick={() => setActiveNav(item.label)}><item.icon /> <span className="hidden xs:inline">{item.label}</span></Button>)}</nav>; }

