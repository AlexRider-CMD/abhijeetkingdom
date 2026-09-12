import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  FileText,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Phone,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentProfile, saveCurrentProfile } from "@/lib/profile.functions";
import familyDinner from "@/assets/family-dinner.jpg";
import gardenLaughter from "@/assets/garden-laughter.jpg";
import birthdayCake from "@/assets/birthday-cake.jpg";

export const Route = createFileRoute("/")({
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

type Member = {
  name: string;
  status: string;
  presence: "In a call" | "Online" | "Away" | "Offline";
  tone: string;
  note: string;
};

const members: Member[] = [
  { name: "Priya", status: "In the evening call", presence: "In a call", tone: "bg-coral text-primary-foreground", note: "🔴 In a call" },
  { name: "Rohan", status: "On the evening call", presence: "In a call", tone: "bg-sage text-primary-foreground", note: "🔴 In a call" },
  { name: "Maa", status: "Having dinner", presence: "Online", tone: "bg-gold text-foreground", note: "🟢 Online" },
  { name: "Isha", status: "Last seen 2h ago", presence: "Offline", tone: "bg-sky text-foreground", note: "⚪ Offline" },
];

const navItems = [
  { label: "Home", icon: Sparkles },
  { label: "Chat", icon: MessageCircle },
  { label: "Memories", icon: ImageIcon },
  { label: "Events", icon: CalendarDays },
];

function KingdomHome() {
  const saveProfile = useServerFn(saveCurrentProfile);
  const loadProfile = useServerFn(getCurrentProfile);
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [entered, setEntered] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  useEffect(() => {
    const remembered = window.localStorage.getItem("abhijeets-kingdom-name");
    if (remembered) {
      setName(remembered);
      setEntered(true);
      void loadProfile().catch(() => undefined);
    }
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

  function startCall() {
    setShowCall(true);
    toast.success("Camera and microphone controls are ready.");
  }

  function knock() {
    toast.success(`${name || "You"} knocked on the Kingdom door 👋`);
  }

  function sendMessage() {
    const cleanMessage = message.trim();
    if (!cleanMessage || cleanMessage.length > 500) return;
    setSentMessages((current) => [...current, cleanMessage]);
    setMessage("");
    toast.success("Message sent to the Family Room.");
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
              <p className="mt-1 text-[11px] text-muted-foreground">Where family is always one call away</p>
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
              <p className="mt-3 max-w-xl text-muted-foreground">Your family is <span className="font-semibold text-foreground">3 members</span> away from being together. The evening call just started with Priya.</p>
            </div>
            <Button className="h-14 self-start rounded-[22px] bg-gradient-to-br from-gold to-coral px-6 font-display text-lg text-foreground shadow-xl hover:brightness-105 lg:self-auto" onClick={startCall}>
              <Video /> Start a Family Call <ChevronRight />
            </Button>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-plum via-coral to-gold p-7 text-primary-foreground shadow-2xl lg:col-span-2">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-card/20" />
              <div className="absolute bottom-6 left-6 size-24 rounded-full bg-card/10" />
              <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"><span className="size-2.5 animate-pulse rounded-full bg-card" /> Live now</div>
              <h2 className="relative mt-3 font-display text-3xl font-semibold">Family Call is Live</h2>
              <p className="relative mt-1 text-primary-foreground/85">Evening call · started by Priya · 2 in room</p>
              <div className="relative mt-6 flex items-center gap-3">
                <AvatarBubble letter="P" tone="bg-rose text-foreground" />
                <AvatarBubble letter="R" tone="bg-sky text-foreground" className="-ml-3 ring-4 ring-card/30" />
                <div className="-ml-3 grid size-12 place-items-center rounded-full bg-card/25 text-xs font-bold ring-4 ring-card/20">+1</div>
              </div>
              <Button className="relative mt-7 h-12 rounded-[18px] bg-card px-6 font-display font-semibold text-foreground shadow-lg hover:bg-card/90" onClick={startCall}>Join Family Call <ChevronRight /></Button>
            </div>
            <Radar />
          </section>

          <section className="mt-9">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">Your Family</h2><Button variant="link" className="text-coral" onClick={() => setActiveNav("Chat")}>View all <ChevronRight /></Button></div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {members.map((member, index) => <MemberCard key={member.name} member={member} index={index} />)}
            </div>
          </section>

          <section className="mt-9 grid gap-5 lg:grid-cols-3">
            <MemoryGallery />
            <KnockCard onKnock={knock} />
          </section>

          <section className="mt-9 grid gap-5 lg:grid-cols-5">
            <ChatPreview sentMessages={sentMessages} message={message} setMessage={setMessage} onSend={sendMessage} />
            <EventsPreview />
          </section>
        </main>
        <MobileNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <p className="pb-3 text-center text-xs text-muted-foreground/70">A private home for your family · Abhijeets Kingdom</p>
      </div>
      {showCall && <CallOverlay name={name} onClose={() => setShowCall(false)} />}
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
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">Where family is always one call away.</p>
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
function AvatarBubble({ letter, tone, className = "" }: { letter: string; tone: string; className?: string }) { return <div className={`grid size-12 place-items-center rounded-full font-bold ${tone} ${className}`}>{letter}</div>; }

function Radar() {
  const rows = [["Online", "3", "bg-sage"], ["In call", "2", "bg-coral"], ["New messages", "4", "bg-sky"], ["New memories", "6", "bg-plum"], ["Upcoming event", "1", "bg-gold"]];
  return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-semibold">Family Radar</h2><span className="rounded-full bg-sage/15 px-2.5 py-1 text-[11px] font-semibold text-sage-foreground">Live</span></div><div className="mt-4 space-y-3">{rows.map(([label, value, tone]) => <div key={label} className="flex items-center justify-between rounded-2xl bg-background/80 p-3"><div className="flex items-center gap-2"><span className={`size-2.5 rounded-full ${tone}`} /> <span className="text-sm font-semibold">{label}</span></div><span className="font-display text-lg font-semibold">{value}</span></div>)}</div></div>;
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  return <div className="rounded-[26px] border border-border/60 bg-card/85 p-5 shadow-xl transition-transform duration-200 hover:-translate-y-1"><div className={`floaty${index + 1} relative grid size-16 place-items-center rounded-full text-xl font-bold ${member.tone}`}>{member.name[0]}<span className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-card bg-sage" /></div><p className="mt-4 font-display text-lg font-semibold">{member.name}</p><p className="text-xs text-muted-foreground">{member.status}</p><span className="mt-3 inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">{member.note}</span></div>;
}

function MemoryGallery() {
  return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-2"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-semibold">Family Memories</h2><span className="rounded-full bg-plum/15 px-2.5 py-1 text-[11px] font-semibold text-plum">On this day · 3 years ago</span></div><div className="mt-5 grid grid-cols-3 gap-3"><img src={familyDinner} alt="Family dinner around a warm table" width={1024} height={1280} loading="lazy" className="col-span-2 row-span-2 h-full min-h-64 w-full rounded-[22px] object-cover" /><img src={gardenLaughter} alt="Children laughing in a sunlit garden" width={1024} height={1024} loading="lazy" className="h-full min-h-32 w-full rounded-[22px] object-cover" /><img src={birthdayCake} alt="Birthday cake glowing with candles" width={1024} height={1024} loading="lazy" className="h-full min-h-32 w-full rounded-[22px] object-cover" /></div></div>;
}

function KnockCard({ onKnock }: { onKnock: () => void }) { return <div className="flex flex-col items-center justify-center rounded-[32px] border border-border/60 bg-gradient-to-br from-sky/40 to-plum/30 p-6 text-center shadow-xl"><div className="floaty grid size-20 place-items-center rounded-full bg-card/80 text-4xl shadow-lg">🚪</div><h2 className="mt-4 font-display text-2xl font-semibold">Knock on the Door</h2><p className="mt-1 max-w-xs text-sm text-muted-foreground">Gently let everyone know you're here and start the room together.</p><Button className="mt-5 h-12 rounded-[18px] bg-card px-6 font-display font-semibold text-foreground shadow-lg hover:bg-card/90" onClick={onKnock}>Knock · 👋</Button></div>; }

function ChatPreview({ sentMessages, message, setMessage, onSend }: { sentMessages: string[]; message: string; setMessage: (value: string) => void; onSend: () => void }) { return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-3"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-coral">Family Room</p><h2 className="font-display text-2xl font-semibold">Recent Conversations</h2></div><Button variant="ghost" size="icon" aria-label="Open family chat"><MessageCircle /></Button></div><div className="mt-5 space-y-2">{sentMessages.map((item, index) => <div key={`${item}-${index}`} className="rounded-2xl bg-accent p-3 text-sm"><span className="font-semibold">{index % 2 ? "Meera" : "You"}</span><span className="text-muted-foreground"> · {item}</span></div>)}<div className="flex items-center gap-3 rounded-2xl bg-background/70 p-3"><span className="size-2 rounded-full bg-gold" /><p className="flex-1 text-sm">Rohan · <span className="text-muted-foreground">just sent a photo from the drive</span></p><span className="text-xs text-muted-foreground">2m</span></div><div className="flex items-center gap-3 rounded-2xl bg-background/70 p-3"><span className="size-2 rounded-full bg-coral" /><p className="flex-1 text-sm">Meera · <span className="text-muted-foreground">“Dinner is ready, come home ❤”</span></p><span className="text-xs text-muted-foreground">18m</span></div></div><div className="mt-5 flex gap-2"><Input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSend(); }} maxLength={500} placeholder="Send a note to the family" className="h-11 rounded-2xl bg-background/70" /><Button aria-label="Send message" size="icon" className="size-11 rounded-2xl bg-coral text-foreground hover:bg-coral/90" onClick={onSend}><Send /></Button></div></div>; }

function EventsPreview() { return <div className="rounded-[32px] border border-border/60 bg-card/85 p-6 shadow-xl lg:col-span-2"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-coral">This week</p><h2 className="font-display text-2xl font-semibold">Upcoming</h2></div><Button variant="ghost" size="icon" aria-label="Open family events"><CalendarDays /></Button></div><div className="mt-5 space-y-3"><div className="flex items-center gap-3 rounded-2xl bg-background/70 p-3"><div className="rounded-xl bg-gold/20 px-2.5 py-1.5 text-center"><p className="font-display text-lg font-semibold">14</p><p className="text-[10px] uppercase text-muted-foreground">Nov</p></div><div className="flex-1"><p className="text-sm font-semibold">Maa's Birthday</p><p className="text-xs text-muted-foreground">6:30 PM · Family Room</p></div><Heart className="text-coral" /></div><div className="flex items-center gap-3 rounded-2xl bg-background/70 p-3"><div className="rounded-xl bg-plum/20 px-2.5 py-1.5 text-center"><p className="font-display text-lg font-semibold">22</p><p className="text-[10px] uppercase text-muted-foreground">Nov</p></div><div className="flex-1"><p className="text-sm font-semibold">Diwali Family Call</p><p className="text-xs text-muted-foreground">8:00 PM · Celebration</p></div><Button size="sm" variant="outline" className="rounded-full">RSVP</Button></div></div></div>; }

function NotificationPanel({ onClose }: { onClose: () => void }) { return <div className="absolute right-5 top-20 z-30 w-[min(92vw,360px)] rounded-3xl border border-border/70 bg-card p-4 shadow-2xl sm:right-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-coral">Notifications</p><h2 className="mt-1 font-display text-xl font-semibold">A little family news</h2></div><Button variant="ghost" size="icon" aria-label="Close notifications" onClick={onClose}><X /></Button></div><div className="mt-4 space-y-2"><div className="rounded-2xl bg-accent p-3 text-sm"><Bell className="mb-2 size-4 text-coral" /><p className="font-semibold">Family call started</p><p className="mt-1 text-xs text-muted-foreground">Priya started an evening call.</p></div><div className="rounded-2xl bg-accent p-3 text-sm"><ImageIcon className="mb-2 size-4 text-plum" /><p className="font-semibold">New memory added</p><p className="mt-1 text-xs text-muted-foreground">A garden moment is waiting in Memories.</p></div></div></div>; }

function MobileNav({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (value: string) => void }) { return <nav className="sticky bottom-3 z-20 mx-auto mt-8 flex max-w-md items-center justify-around rounded-2xl border border-border/70 bg-card/90 p-2 shadow-2xl backdrop-blur lg:hidden">{navItems.map((item) => <Button key={item.label} variant="ghost" size="sm" className={activeNav === item.label ? "bg-accent text-accent-foreground" : "text-muted-foreground"} onClick={() => setActiveNav(item.label)}><item.icon /> <span className="hidden xs:inline">{item.label}</span></Button>)}</nav>; }

function CallOverlay({ name, onClose }: { name: string; onClose: () => void }) { const [mic, setMic] = useState(true); const [camera, setCamera] = useState(true); return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm"><div className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-2xl"><div className="flex items-center justify-between border-b border-border/60 px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-coral">Family Room · Live</p><h2 className="font-display text-2xl font-semibold">Evening call</h2></div><Button variant="ghost" size="icon" aria-label="Leave call" onClick={onClose}><X /></Button></div><div className="grid gap-3 bg-foreground/5 p-4 sm:grid-cols-3"><div className="relative min-h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-plum/70 via-coral/70 to-gold/70 sm:col-span-2"><div className="absolute inset-0 grid place-items-center text-6xl text-card/70">♛</div><div className="absolute bottom-4 left-4 rounded-full bg-foreground/45 px-3 py-1 text-sm text-primary-foreground">You · {name}</div><div className="absolute right-4 top-4 rounded-full bg-sage px-2 py-1 text-xs font-semibold text-foreground">Excellent connection</div></div><div className="flex min-h-72 flex-col gap-3"><div className="flex flex-1 items-center justify-center rounded-3xl bg-sky/35 text-4xl font-bold text-foreground">P</div><div className="flex flex-1 items-center justify-center rounded-3xl bg-gold/35 text-4xl font-bold text-foreground">R</div></div></div><div className="flex flex-wrap items-center justify-center gap-3 border-t border-border/60 p-4"><Button variant={mic ? "outline" : "destructive"} size="icon" className="size-11 rounded-full" aria-label="Toggle microphone" onClick={() => setMic((value) => !value)}><Mic /></Button><Button variant={camera ? "outline" : "destructive"} size="icon" className="size-11 rounded-full" aria-label="Toggle camera" onClick={() => setCamera((value) => !value)}><Camera /></Button><Button variant="outline" size="icon" className="size-11 rounded-full" aria-label="Share screen"><MoreHorizontal /></Button><Button className="h-11 rounded-full bg-coral px-5 text-foreground hover:bg-coral/90" onClick={onClose}><Phone /> Leave call</Button></div></div></div>; }
