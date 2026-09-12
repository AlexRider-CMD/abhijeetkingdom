# Family Hearth

Master Build Prompt — “Abhijeets Kingdom”

Build a complete, production-quality family communication web application called “Abhijeets Kingdom”.

The product should feel like a private digital home for a family — warm, premium, extremely easy to use, visually beautiful, fast, responsive, and reliable. It should combine video calling + family group chat + photo sharing + file sharing + family presence + fun interactive features into one seamless website.

Do NOT use fake branding, fake company names, placeholder product names, lorem ipsum, random fictional family names, or generic template branding. The only product name/brand should be Abhijeets Kingdom.

The design must feel original and professionally designed rather than looking like a clone of Zoom, Google Meet, WhatsApp, Discord, or Teams.

1. Core Product Concept

Abhijeets Kingdom is a private family communication space.

A family member should be able to:

Open the website.

Enter their name.

Enter the family space.

Immediately see who is online.

See whether someone has started a video meeting.

Join an active family video call with one click.

Start a new family video call.

Send text messages.

Send photos.

Send videos.

Send documents and other files.

Use emojis, GIFs/reactions, and stickers.

Use fun camera filters during video calls.

See missed calls and recent activity.

Receive notifications when another family member starts a call or sends a message.

Continue conversations without needing separate applications.

The entire experience should feel like:

“Our family's private digital home.”

2. Entry Experience

Create a beautiful full-screen landing/login experience.

Brand:

Abhijeets Kingdom

Tagline:

“Where family is always one call away.”

The first screen should be extremely simple.

Center a beautiful animated card containing:

Abhijeets Kingdom logo/wordmark

Short welcome message

Name input

“Enter Kingdom” button

Example:

“Welcome to Abhijeets Kingdom”

“Enter your name to join your family space.”

Input:

Your name

Button:

Enter Kingdom →

Do not require complicated account creation for the initial family experience.

After entering a name, remember the user's session so they don't have to repeatedly enter it on every visit.

Include subtle animated background elements representing:

Family

Connection

Warmth

Home

Communication

Use elegant gradients, soft glass effects, subtle particles, and smooth motion.

Do not overdo animation.

3. Main Dashboard

After entering the Kingdom, show the main family dashboard.

The dashboard should immediately communicate:

“Welcome back, [User Name]”

Then show:

Family Presence

Display family members as beautiful profile circles/cards.

Each member can show:

Profile photo/avatar

Name

Online/offline status

“In a call” status

Last active

Current activity

Use clear presence indicators:

🟢 Online

🟡 Away

🔴 In a call

⚪ Offline

Example:

“Someone is in the family room”

“In a call • Join now”

4. Active Call Experience

This is one of the most important parts of the application.

If another family member starts a call, every other family member should immediately see a prominent live invitation.

Example:

“A family meeting has started”

“Join the family call?”

Buttons:

Join Call

Not Now

The active-call card should appear on the dashboard without requiring users to manually search for the call.

If the browser supports notifications and the user has granted permission, send a browser notification such as:

“A family call has started in Abhijeets Kingdom.”

Clicking the notification should take the user directly to the call.

5. Start Family Call

Create a highly visible:

Start Family Call

button.

When clicked:

Request camera permission.

Request microphone permission.

Show a camera preview.

Allow the user to select camera/microphone.

Allow joining with camera off.

Allow joining with microphone muted.

Show connection status.

Start the family meeting.

The call should use a proper real-time video architecture such as WebRTC, with an appropriate signaling/backend architecture.

Do NOT simulate video calling.

The implementation should be designed for actual real-time communication.

6. Video Call UI

Create an extremely polished video-call interface.

Main area:

Large active speaker video.

Other participants:

Small floating/side participant tiles.

Controls at the bottom:

Microphone

Camera

Speaker/audio

Screen share

Chat

Reactions

Camera effects

Participants

More

Leave call

Use beautiful animated controls.

When someone speaks, subtly highlight their video tile.

Display:

“You are speaking”

or an elegant audio activity indicator.

7. Smart Family Call Features

Add thoughtful family-focused features.

One-Tap Reactions

Allow users to send:

❤️

😂

👍

👏

🎉

😍

🙌

Reactions should float upward over the video and disappear naturally.

Family Applause

A dedicated celebration interaction that creates multiple subtle animated reactions.

Mute Everyone

Available only to the call host.

Invite Family

Allow the host to generate/share the family room invitation.

Raise Hand

Useful when several family members are talking.

Call Timer

Show call duration elegantly.

Connection Quality

Display a small unobtrusive indicator:

Excellent connection

Good connection

Weak connection

Reconnecting...

8. Video Filters & Camera Effects

Add a fun camera-effects panel.

Categories:

Face Filters

Examples:

Soft glow

Warm family look

Celebration

Funny face

Confetti

Hearts

Sunglasses

Cartoon-style effects

Backgrounds

Allow:

Blur

Home

Garden

Celebration

Simple gradient

Custom uploaded background

The filters should feel modern and tasteful.

Do not make the application look childish.

9. Family Chat

Create a permanent family chat section.

Layout:

Left:

Conversation/navigation.

Center:

Messages.

Right:

Optional family/activity panel.

Chat should support:

Text

Emoji

GIFs

Stickers

Photos

Videos

Documents

PDFs

Audio files

Other common file types

Every message should display:

Sender

Avatar

Time

Message content

Delivery status where appropriate

Use beautiful message bubbles.

10. File Sharing

Users should be able to drag and drop files directly into the chat.

Support:

Images

Videos

PDFs

Documents

Presentations

Spreadsheets

Audio

ZIP files

Other safe file types

For images:

Show inline previews.

For videos:

Show playable previews.

For documents:

Show a file card containing:

File name

File type

File size

Download/open action

Display upload progress.

Display:

Uploading...

Processing...

Uploaded ✓

Handle failed uploads gracefully with:

Retry

11. Photo Memories

Create a dedicated section called:

Family Memories

This is more than a normal gallery.

Users can upload family photographs.

Automatically organize them by:

Date

Month

Year

Album

Event

Create beautiful visual masonry/grid layouts.

Allow users to:

Like photos

React

Comment

Download

Share within the family

Create albums

Include a beautiful:

“On This Day”

feature that surfaces photos from previous years.

Example:

“On this day — 3 years ago”

Then display relevant family memories.

12. Family Timeline

Create a private activity timeline.

Examples:

“Family Call started”

“Photo added to Family Memories”

“New video uploaded”

“Family member joined”

“New album created”

“Document shared”

“Birthday celebration started”

Keep it elegant and non-intrusive.

13. Family Rooms

Create optional rooms for different purposes.

Examples:

Family Room

Main communication space.

Memories

Photos/videos.

Announcements

Important family updates.

Celebrations

Birthdays, festivals, achievements, etc.

Documents

Important shared files.

Allow the family administrator to create additional rooms.

14. Family Announcements

Create an announcement feature.

A family member with permission can post:

Important updates

Travel plans

Birthday announcements

Family events

General notices

Important announcements should be visually distinguished.

Allow:

📌 Pin announcement

🔔 Notify family

❤️ React

💬 Comment

15. Family Events

Create a simple family calendar/event system.

Allow users to create events such as:

Birthday

Family dinner

Vacation

Anniversary

Festival

Video call

Important reminder

Each event should have:

Title

Date

Time

Description

Participants

Reminder

Include:

Join video call

if the event is associated with a meeting.

16. Family Status

Allow each person to set a temporary status.

Examples:

“Available”

“Busy”

“Watching something”

“Having dinner”

“Sleeping”

“On vacation”

“Call me”

Also allow custom status.

The status should appear beside the user's profile.

17. Emergency Family Ping

Create a highly useful feature:

Family Ping

A family member can send a high-priority alert to everyone.

Example:

“Please call me when you see this.”

or

“Need everyone to join the family call.”

The UI should clearly differentiate this from normal messages.

Do not make it visually alarming unless configured as an emergency.

18. Family Broadcast

Allow a user with permission to send one message to everyone.

Example:

“Dinner is ready ❤️”

The message should appear as a special broadcast card.

19. Presence Intelligence

Make the dashboard feel alive.

Show:

Who is online

Who is currently in a call

Who recently joined

Who recently sent a message

Who is away

Use subtle real-time updates.

Do not constantly flash or animate the interface.

Animations should communicate meaningful state changes.

20. Call History

Create:

Recent Calls

Show:

Date

Duration

Participants

Missed/answered status

Example:

“Family Evening Call”

“5 participants • 42 minutes”

Allow:

Call Again

21. Notifications Center

Create a notification drawer.

Notifications can include:

Family call started

New message

Photo uploaded

File shared

Event reminder

Family announcement

Someone joined

Missed family call

Allow:

Mark as read

Mark all as read

Notification preferences

22. Search

Add global family search.

Search:

Messages

People

Photos

Videos

Files

Announcements

Events

Example:

Search:

“birthday”

Results should intelligently group:

Messages

Photos

Files

Events

People

23. User Profile

Each family member should have a beautiful profile page.

Show:

Profile picture

Name

Status

About

Recent activity

Shared media

Shared files

Allow the user to edit:

Name

Profile image

Status

Theme preferences

Notification preferences

Camera/microphone settings

24. Family Settings

Create a clean settings area.

Sections:

General

Family name

Appearance

Language

Time zone

Notifications

Calls

Messages

Events

Announcements

Memories

Privacy

Profile visibility

Activity visibility

Last seen

Media permissions

Calling

Default microphone

Default camera

Video quality

Background effects

Family Management

For authorized administrators:

Add family members

Remove family members

Manage roles

Manage rooms

Manage permissions

25. Family Roles

Support permissions.

Possible roles:

Family Admin

Full control.

Family Member

Normal communication access.

Guest Member

Limited access if the family chooses to allow it.

Do not expose administrative controls to normal members.

26. Invite System

Create a secure family invitation system.

A family administrator should be able to create an invitation.

The invitation should lead to:

Join Abhijeets Kingdom

Then ask the new member for their name.

Avoid exposing unnecessary family information before joining.

Invitation links should support expiration/revocation.

27. Security & Privacy

This is a private family application, so privacy should be treated as a core product feature.

Implement:

HTTPS

Secure authentication/session handling

Secure file uploads

Access-controlled family spaces

Authorization checks

Secure WebRTC signaling

Private family data

Protected media URLs

File type/size validation

Rate limiting

Abuse protection

Secure database rules

Secure API endpoints

Never rely only on frontend permission checks.

Every important operation must be authorized on the backend.

28. Real-Time Architecture

The application must be genuinely real-time.

Use an architecture suitable for:

WebRTC video/audio

Real-time signaling

Presence

Chat

Typing indicators

Read receipts

Notifications

Call state

File upload state

Optimize the system to minimize latency.

For video calls, implement adaptive quality so the system can respond to changing network conditions.

Prioritize:

Stable connection > unnecessarily high resolution.

When network quality decreases, intelligently reduce video quality instead of allowing the call to freeze.

When the connection improves, quality can recover automatically.

29. Reconnection

This is extremely important.

If someone's network temporarily drops:

Show:

Reconnecting...

Attempt to recover the connection automatically.

Do not immediately throw the user out of the call.

If reconnection fails, provide:

Try Again

The rest of the chat application should remain usable.

30. Responsive Design

The website must work beautifully on:

Desktop

Laptop

Tablet

Mobile browser

On mobile:

Use bottom navigation:

Home

Chat

Call

Memories

More

The video-call UI should adapt specifically for portrait mobile screens.

Do not simply shrink the desktop interface.

31. Visual Design Direction

Create an original premium visual identity for Abhijeets Kingdom.

Design language:

Premium

Warm

Modern

Family-oriented

Minimal

Elegant

Emotional

Friendly

Technically sophisticated

Suggested visual direction:

Deep navy / midnight base

Warm gold accents

Soft coral/rose highlights

White/off-white content surfaces

Subtle glassmorphism

Soft gradients

Large rounded corners

Elegant shadows

Fine borders

Smooth micro-interactions

Do not make every component glassmorphic.

Use glass effects selectively.

32. Typography

Use a highly readable modern typeface.

Hierarchy should be obvious:

Large page headings

Medium section headings

Clear body text

Small metadata

Use generous spacing.

Avoid overcrowding.

33. Animation System

Animations should feel premium.

Use:

Page transitions

Card entrance animations

Smooth modal transitions

Button hover animations

Subtle avatar presence animations

Floating reaction animations

Message arrival animation

Upload progress animation

Call connection animation

Skeleton loading states

Smooth navigation transitions

Use animation to communicate state.

Avoid excessive bouncing, spinning, or distracting effects.

34. Signature Home Screen

Make the home screen feel special.

At the top:

Good evening, [Name]

Then a dynamic message such as:

“Your family is 3 members away from being together.”

If someone is currently calling:

Show a large hero card:

Family Call is Live

“Started by [family member]”

Button:

Join Family Call →

If no call is active:

Show:

Start a Family Call

Then display:

Your Family

Beautiful member cards.

Then:

Recent Conversations

Then:

Family Memories

Then:

Upcoming Events

35. “Family Radar” Feature

Create an original feature called:

Family Radar

A visual overview showing the current family state.

For example:

🟢 3 Online

📞 2 In Call

💬 4 New Messages

📸 6 New Memories

🎂 1 Upcoming Event

Make this feel like a live family dashboard.

36. “Knock on the Door” Feature

Create a playful but elegant interaction.

If nobody is currently on a call, the user can press:

Knock on the Door

This sends a gentle family notification:

“[Name] is knocking on the Kingdom door 👋”

Other family members can respond:

Open Door

which immediately starts a family call/join flow.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://abhijeetkingdom.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a52e85d1-9035-49a0-ac94-ad1364d67e5a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
