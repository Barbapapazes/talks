Hello everyone, I hope you're doing well. It's really nice to see so many of you. You're still coming in, so that's great.

You're a bit packed towards the back. As you saw on the programme, there were supposed to be two of us. Unfortunately, I'll be alone: Julia couldn't join us today, so I'll try to handle this on my own.

It wasn't planned, but it's not a big deal. I might even do this in a slightly different format than what was planned.

You'll see, it can quickly become anxiety-inducing; it can potentially raise a lot of questions. And since there are many of us, coming from different companies with different practices, this can also be an opportunity to share and exchange.

So if, at any time, you have questions, feedback, or things you do related to what you hear, don't hesitate to share them. I think everyone would be very happy to know what's happening elsewhere, in other companies.

I'll make sure to relay questions and information so everyone can hear.

To get this talk started properly, we need to take a little time to understand where it comes from, why it was written, and its origins. To do that, I'm going to tell you a short story.

Ten years ago I was in high school. And actually, high school is the time of Parcoursup, when you make choices about your future, applying to schools and deciding what you'll do later.

It's a moment when you really have the chance to become what you want. You can become a teacher, musician, doctor, actor, veterinarian, artist, police officer, writer, even an engineer or even an astronaut, really. You can dream big.

You tell yourself: okay, in ten years this is what I'll probably be doing. Once you make your choice—in my case it was engineering studies—you enter a post‑bac school, you keep training for five years, and you spend a lot of time working and learning things.

At the end, you hope to get a diploma and enter the workforce. On paper it's relatively simple: it starts in high school, you imagine things, you work to get them, and in the end you have the diploma and do what you wanted to do.

On paper it's simple. But in reality, in 2024, when you arrive in the workforce, what do you see? You see claims that AI will replace developers, which sucks when you went to engineering school to become a developer, that intellectual jobs are doomed and juniors have no future.

It's really painful to arrive in the workforce at that moment. There are articles with sensational headlines that sometimes tell us that everything we prepared for, everything we imagined for ten years, is dead.

That it won't happen, and that all the work we thought we'd do and could do was potentially for nothing. And that hurts a bit.

We realized we weren't at all alone in that situation. There were many people: of course those finishing their studies then, but also people changing careers.

So we faced a choice, a dilemma. We asked ourselves what our two options were in front of that.

Either we stay in fear, in sensationalism, in everything the press has tried to sell us for a few years—telling us we have no future, we're done, we're useless—or we try to go a bit further.

We try to question ourselves, to understand what the reality is, what is happening and how we can act on ourselves and on our environment to continue to exist in that world and not be crushed by what we read.

To add some context to all this, while writing the talk and preparing the topic, I tried to immerse myself fully in the thing, really to the end. Concretely, that means that since about November, on my personal projects I hardly write any code anymore.

Everything is delegated to agents, to see to what extent we can indeed be replaced. How does it go in practice? I work a lot with Copilot, via my phone among other devices, or my computer.

I launch agents on the cloud, on GitHub, Copilot Agent, they do the stuff for me. I take the metro, I start a small agent, I get home in the evening, I do a review, and generally it goes to production.

At work it's a bit different. I have a little secret right now: my goal is to stop writing code.

So it's about finding tricks, ways to avoid having to write code. Is it a good idea? I don't know. But at least it forces me to immerse myself fully in the thing.

And here, it might be an even worse idea—the future will tell—but I use ChatGPT all the time, notably talking to it as if it were a human. And I watch what it answers.

So I tried to push the slider all the way, to test the limits a bit, in order to give you the most interesting material possible today.

Before getting into more concrete elements, there are two things I'd like to talk about, among others: benchmarks. The first is ARC-AGI 2. There's a 3 that came out recently.

On the x‑axis you have a logarithmic price, so at the end there's 100, before that 10 and 1. And on the y‑axis you have the score.

Overall, the numbers themselves don't matter much. What you need to know is that at the maximum on the x‑axis we're at $100.

What we see is an increase in model performance. You don't see the names, but here are the latest most performant models, and there are earlier models over there.

As time goes on, the trend tends toward an exponential, so an increase in model performance without a big increase in price. In other words, making an AI work is cheaper than making you work, depending on what we ask them to do. That's the idea.

The other benchmark has years on the x‑axis and task length on the y‑axis. The idea is to see that progress is exponential with the length of the task for a certain level of reliability.

Roughly, you should read it as meaning that today we have AIs capable of completing six‑hour tasks with about a 50% success rate. The AI doesn't literally work six hours, but it's equivalent to you working six hours.

The interesting part, again, is not the numbers but seeing that it's exponential. And that overall, we are at the start of a change that only grows exponentially.

So what I'm telling you may not be true tomorrow. And finally, there's another interesting article. It's not a benchmark; it's Situational Awareness, written by a former OpenAI employee.

It's about a hundred pages, very interesting, I recommend reading it, but broadly it talks about how things will evolve. It explains that the increase in compute power, algorithmic improvements—both software and hardware—and the tooling of environments, meaning all the tools we can give our AIs, mean we'll persist for a long time in this exponential growth.

In other words, tomorrow we'll have models better than today's. That raises a lot of questions, starting with the first: what is a developer?

It's an interesting question to ask to understand what's changing. For me, a developer is someone capable of solving problems using software and who mobilizes software engineering principles to analyze, design, test, deploy and maintain systems.

All those points are super interesting. Being a developer isn't just writing code. We write a lot of code, but that's not all.

We can transform a need, constraints, and trade‑offs into a functioning system. We answer a client's need, and that can evolve. And above all, tomorrow we must also be able to maintain the system.

AI, the dance it's doing, is shifting this center of gravity. Because today it produces a significant share of the code.

I told you at the start: I pushed the slider to the limit. When I launch an agent, the AI does it. I didn't write the code: I had the idea for the feature, it implemented the feature, it developed it, it wrote it.

And that works well when the problem is already well framed, documented, and on topics similar to what you're asking it to do. The final interesting point is that typing speed at your keyboard is no longer a bottleneck.

Today you can type code slowly. In fact, we all end up doing things at roughly the same speed.

And this small change, which seems trivial, that we no longer hand‑write code, has enormous consequences. And everything that follows stems from that.

Until now, we wrote code. We produced code line by line, but that's no longer the case.

It's not because writing code becomes cheaper that software becomes simpler to produce. We saw earlier what a developer is: an engineer is much more than writing code.

And it's important to remember that, especially when people say developers are dead. The code‑writing part, yes maybe; the rest is still an open question.

In the transformation of the job, everything shifts a bit. Since we no longer write the code, all the adjacent tasks will take up much more space.

We have specifications, which may now take more space, because if AI is in charge of writing the code you want to specify it correctly so it writes it right the first time. All the contextualization—giving it the right resources, the right documents—matters.

There's also evaluation and code review. Potentially, if you produce more code and it writes it faster, that means more code to review.

There are also guardrails: how to ensure the AI writes code that matches your best practices, how you keep overall coherence, and who remains responsible for the code written. Those are changes happening now.

In the end, we realized that to write this talk we relied on various scientific papers, many articles by many authors and a lot of interviews. Notably an interview with Hugo Richard, who told us that today in his company he has become an orchestrator.

He directs agents to do things, but he himself no longer writes code. And Keith Morris suggests distinguishing several stances.

So that's what we see. Until now the software development lifecycle looked like this: you had an idea, you worked on it, and working on it meant planning, writing code, with a loop like that.

With the arrival of AI, we have three possibilities. There are three ways to see things.

The first is to say that I, as a human, will simply think and plan, and then AI will do everything. That's broadly vibe coding: you don't look at the code, you don't do reviews.

Then you have the human in the loop. There you iterate with AI, which sits in the middle and works.

And then you have the final model. That's what Keith Morris calls being on the software development loop, where you participate in design, ask AI to write code that you review and of which you remain the owner.

Those are the three notions it is crucial to be aware of. Until November 2023, we had no choice but the historical configuration. Today we have several choices.

So what is the right choice? Today we realize that it's potentially the last one, maybe the most interesting.

But we also see that vibe coding has interesting effects, or not, for site security in particular. And finally, what we see with these three changes is that engineering work rises in abstraction.

That is, we no longer need, or it is no longer mandatory, to look at each line of code. We can speed up, save time, but that means we rise in abstraction.

Potentially, it can work. And code, as such, is no longer necessarily the end goal of what we produce.

Another interesting point is that when we wrote code, we actually did two things at once without noticing. We did production—we wrote and modified code and reached a final result.

But in parallel there was absorption. Taking time to write code, that slowness we considered a drawback actually allowed us to understand what we were doing.

It allowed us to picture in our heads how systems worked and to build mental models—simplified versions of the system that let us say when a client came with a problem: "Ok, this will work, that won't, this we can do," because we had those simplified abstractions to use.

Until now those two processes were coupled. We sat at our keyboard, wrote code, and absorbed the code.

Today AI separates them. It separates them because production is no longer done by us.

So if we no longer write the code, we can't absorb it. We don't have the time: it generates much faster than we can absorb.

Thus code becomes much cheaper to produce than to perceive. Generation speed rises far too quickly relative to our capacity to read and understand it, because our comprehension speed hasn't been increased by AI.

It remains completely human. And that raises many questions, notably the one about cognitive debt.

You've surely all heard of technical debt. It's the idea of shipping a bit faster, postponing cleanup, and the bill comes later, but at least you shipped faster.

It's a trade‑off. Cognitive debt is a bit the same.

We will produce changes that nobody really has the time to absorb, understand or reread. So we have working code, passing tests, progressing tickets, but our understanding of the software declines.

In the short term, that can work. The risk is that in the long term we ship a lot more but teams no longer understand what they're doing.

Potentially even that tomorrow the client… With our current view of AI—since potentially AI will become good enough that we no longer have those issues—today it's still a risk much discussed.

The problem is that so far we talked a lot about code writing at the individual level. We sat at our computer, we sat down and we wrote code.

But it goes far beyond us individually: it happens at the organizational level. Because in organizations you have metrics, KPIs, that tell you how fast you're moving.

Today those metrics are mainly time‑based, for example review time. Are you able to review PRs fast enough, or does it take too long? Maybe you should speed up.

Do you have velocity? Do you move a JIRA ticket to production fast enough? Do you ship enough features?

If you take DORA for example, notably its change lead time criterion—your ability to go from a ticket to production—are you fast enough? With AI you can compress all that time at the cost of understanding.

So today we have metrics in companies that focus on speed. And people not familiar with the craft might read those metrics and say: "With AI, reduce these metrics," and you'll reduce them.

But you won't understand your code anymore. So potentially that means the metrics that served us yesterday must be completely rethought.

And indeed, DORA released an updated 2025 version taking AI into account. It reminds me of this image: "What's your main quality? — I'm very fast at mental arithmetic. — Ok. 26 x 564? — 57. — That's wrong. — Yeah, but it was fast."

With AI it's the same. I shipped quickly, but I didn't understand anything. But it works.

And that's a real danger to watch out for, especially since demands will come from above. Management will want you to go faster.

In fact, you'll have to resist a bit, because it's not that simple. The equation isn't just "I ship faster."

By doing all this we move the bottleneck that used to be us, our ability to write code. We used to hire many people to produce more.

In fact, we move that bottleneck. Much more code means review problems.

Today, take a junior for example who uses AI. A junior isn't necessarily ready to review PRs, yet they will produce code.

You have to take responsibility for it, you have to review it. So what do we do? What do we put in place? Do we also use AI agents to review all the code, to do first passes, first iterations?

We're also the first line for QA. If we produce even more features, will QA be able to handle it?

It also raises questions about tickets, quality of context, product decisions. How does the PM give us enough?

How do we avoid getting bored at work? Even if I think we have enough to do, it raises questions.

And finally, on the whole the last most interesting point is: what is the organization's capacity to absorb? Because it also raises potential legal questions about certain features, HR questions, client discussions.

And that's a pressure that moves. Today it was on production; today it's more about control.

Anivela goes further in this questioning and asks: even when engineering produces faster, the rest of the system doesn't necessarily follow. Decisions and coordination themselves operate at a human speed.

We absorb at human speed. So we produce at AI speed, maybe ten times faster, but we absorb at human speed.

What it asks is: is humanity ready for that much software? Take a concrete example: you develop software and add ten features a day.

Your client will need you to explain those ten features a day. They will have to adopt them, use them, integrate them into their workflow.

Are we, as humans, really able to manage all that? It's a question.

If we go back to the idea of the human in the loop, another thing happens that is interesting to notice: we had an intimate experience with our craft. That idea of writing code was intimate.

And now new fatigues appear. Supervising an agent, reading agent feedback, reading chatbots, switching from agent to agent, making arbitration choices—the agent asks us things.

You have to understand its whole reasoning. You have to be hyper‑critical about outputs that seem plausible but are actually wrong, so you have to detect them.

All these things are things we're not used to, we haven't trained on them, we haven't spent time learning them. And today that creates new fatigue.

That's what people feel and what articles report. Changing the job is like an athlete changing disciplines.

You have to relearn everything. And today, it's very tiring.

There was another dimension: reward. When we close a ticket, fix a bug, ship a feature, we get a little reward that feels good.

But today, with AI, you can get those rewards infinitely and very quickly. So iterating faster can also lead to a much more compulsive relationship with the tool.

"Are we eating? Wait, I'll launch a small agent. A second one. We'll do it later."

Until the moment when all this imposes too much mental load, it becomes too hard and catches up with us.

And in other transformations of the job, AI acts as an amplifier. At the very start, there wasn't a huge difference between two organizations.

But as AI amplifies everything, it will amplify both your strengths and your weaknesses. So you'll end up at the top right in the green, but also your flaws will be amplified.

If you had processes that didn't work well, AI will reveal them much more strongly, exponentially even. So it's a subject to be aware of.

On the junior question, two visions oppose. The first: it's over for them, they're the first victims and the hiring pipeline is broken for the next ten years.

That's the pessimistic view.

The second is that it won't change much, because you mustn't confuse what a developer is with typing code. It raises questions because if AI does the simple tasks we used to give juniors, well.

Today those two visions oppose. There's no answer yet, especially since the market is hard to analyze due to geopolitical and economic issues.

Finally, to succeed in training a junior today, until now we gave them small tasks that we now give to AI. If you tell a junior to do something and they use AI, they may succeed, very likely.

But they won't necessarily be able to explain it, defend it, and maintain it over time. I talk about juniors, but the same can happen to us when we enter a new domain.

So it creates what we call fragile experts: people who give the impression of mastery and, if you dig, there's nothing. That's a real problem.

It raises the question of how to train juniors now if you can't give them small tasks. For that, there's exposure to excellence.

That is, show them what good code really is. Give them human feedback, not just a chatbot that always agrees with them.

It's also understanding trade‑offs, not just "do this." No: you do it this way because it's more interesting than that other technique, which could be used in another situation.

It's also progressive responsibility, giving juniors more importance.

Finally, on job transformations, remember that we may be creating huge cognitive debt by wanting to accelerate. It's unpleasant.

The bottleneck moves. So when people tell you "write code with AI," yes, but the rest of the company may not follow at all.

And you have amplification of strengths and weaknesses. What you did well will be done even better, but what was difficult will become harder, and those will be points to work on individually or organizationally. And there's a real risk for juniors.

Today we don't really know yet, but what's certain is that we can no longer give juniors the small tasks we give to AIs. We must find other ways to train them.

Because people often say the developer job will disappear. As such, you won't lose your job.

However, the job you knew no longer exists. That's the nuance, in my view.

It's subtle but crucial. It means that if you entered the profession to enjoy writing code, it might start to become complicated.

Now that we no longer write code, if all engineering shifts, the question is what happens, where we go, and what the developer must learn and put back at the center.

There are two bad reflexes to avoid right away. Not everything will become prompting: that's not the skill to develop.

And it's not enough to continue as before—writing code line by line—to think you'll stay on the right side of history. You can't just close your eyes.

Because if producing code becomes cheaper, value increases elsewhere: understanding, framing, judging what AI did, acting, and remaining responsible.

So the fundamentals: people say coding is useless. In fact, coding still matters, and even more deeply, fundamentals matter more today than yesterday.

Until now we valued the transition from a JIRA ticket to implementation. We hired people simply to write code.

But today AI does that. So learning the basics becomes the most important thing.

Matteo Collina speaks about this well in one of his articles, saying fundamentals are regaining value: algorithms, databases, networking, distributed systems, architecture, reliability—to be able to see if what AI proposes is correct, appropriate, maintainable and coherent with the rest of the system.

Today learning or relearning the basics isn't just for technical reasons. It's to increase your capacity to judge what AI does.

Actually, it's the capacity for judgment that must improve. We must change.

Then there's this triangle, the triangle of effectiveness. In green discernment, in orange technical capabilities, and in blue the power to act.

Today technical capability is the one collapsing, because it's the part of "I write code." That causes issues.

Thus discernment becomes very important. It's the ability to recognize excellence, to distinguish a robust solution from a fragile one, a good abstraction from a useless one, or a convincing prototype from technical debt.

But that doesn't mean technique has disappeared just because that part collapses. It's just a foundation that becomes less visible, hence the rise in abstraction, to strengthen discernment and power to act.

Because AI increases the value of judgment. And you judge better when you've already coded, broken systems, maintained a system over time, or taken a bad decision and had to own it six months later.

We are much better at judging what AI gives us.

We talk a lot about agentivity for AI—the ability of AIs to do things by themselves, to make decisions. We talk much less about human agentivity, but it's just as important.

It's launching a prototype, testing something, exploring a solution—because today testing costs much less than before. It's moving forward, it's daring.

And that becomes a crucial skill, especially when producing code costs almost nothing. Hugo Richard told us it's his curiosity that lets him keep moving forward and exploring what AI does, testing new techniques, setting up new solutions. Alan the company also talks about the power to act as a differentiator.

Because agentivity isn't just doing things faster. It's the courage to act.

And it certainly doesn't replace understanding. We move, observe what happens: I tried, I look, did it work, did it not, do we continue?

It's about correcting, learning and retrying—not just moving forward without ever looking back, without ever understanding. So it's the notion of acting effectively on your environment or yourself to understand what you're doing.

Finally, the other critical skill is critical thinking. One definition is to accept no assertion without questioning its value.

You immediately see its importance. When AI outputs a plan or 300 or 500 lines of code, you can't just accept it.

And above all, it protects us on two levels. Critical thinking protects us from simplistic discourses about AI, the gurus who say we're finished and our job is over, or that buying a course makes you an AI master.

It also protects us from AI itself. In that you'll find analyzing, evaluating, comparing, cross‑checking sources, questioning assumptions—not just saying yes all the time—and accepting not to know everything immediately.

So on skill evolution, mastering the basics returns to the forefront to learn to judge; judging with discernment is recognizing excellence; working on agentivity—curiosity and taking action—is important; and strengthening critical thinking is essential to use AI without stopping thinking.

There's this wonderful expression: "wonder‑filled vigilance." It's the idea that AI is something we can approach, that is amazing, without turning it into something mystical, while staying alert to its consequences for what we're doing.

So if all these skills change, if code loses value but judgment gains it, what's next? How do we develop these new skills, and how do we keep learning as individuals and within organizations? How do we upskill?

It happens through different stages. See these stages as a high‑level way to reposition yourself and understand things at a macro level, not as a concrete plan you must follow.

In the first stage, AI engaged, the idea is that AI enters daily life: we use it to summarize a document, generate a test, or debug a bug. At that stage, for organizations or individuals, the issue isn't ROI.

It's about having a common base—a shared language so everyone understands a bit what AI is, its stakes and possible transformations.

For example, within organizations you can run internal mini conferences, labs, courses, workshops. Structured groups can say: OK, we master AI and will help people upskill, share news, simplify and ensure everyone gets others' feedback.

Some companies like Vercel have demo days where a culture asks people to experiment, and it's okay to take time at work to try things with AI. Because if a company only hands out licenses, that won't help people upskill.

Next are the enabled. The idea is to start integrating AI into workflows to transform how we work.

So once we have a common base, what do we put in place? What do we set up for context?

Sonil Pei talked about context, which becomes the real work. Making intentions, constraints, decisions, and validation criteria explicit. That also involves documentation.

And finally, the last component is to integrate AI into the whole production chain. More concretely, it's enriching a ticket with AI, generating code faster with more context.

It's the idea of starting a project only when it has its skills, its MCPs, and so on. That is a fantasy for many because it's the idea of having a ticket, snapping your fingers, and it's in production.

We're still a bit far from that. And for many it's a fantasy because our work remains highly collective and crossed by quality, security and coordination constraints.

So that stage also raises the question of which frictions we absolutely want to keep in our work.

And at the individual level it raises how we continue to learn and use AI. Because it's not just about using AI; it's how we learn with it without abandoning our understanding.

That means staying up to date but also filtering, because you can't follow everything. There is big news every day; you can't do it all.

And avoid turning AI into a permanent substitute for the effort to understand. If you delegate everything to AI, you become a bit dumb—I realize that.

And that's the whole skill atrophy part: our competencies fade as we delegate them to AIs, and when we need them we no longer know how to do them.

Try this at home: for a month, try not writing code yourself. Then try to write code again. It's very hard.

I couldn't get back to it. So producing without absorbing what you produce is dangerous.

Be aware of everything generated and rely on other humans, not only AIs. And in this upskilling, watch these three main stages and keep the idea of staying in motion individually.

If we recap what we've seen: the job is changing, the job we knew is not the same as today and even less the job of tomorrow.

With potential cognitive debt creation, a shift of bottlenecks: it may no longer be you who is the problem; QA can be slowed, reviews too, or the PM providing enough tickets.

The amplification of strengths and weaknesses means structural issues will worsen, and there's a risk for juniors.

On skill evolution, mastering the basics becomes crucial not for pleasure but to judge with discernment what AI produces. Working on agentivity—curiosity and action—is crucial.

And strengthening critical thinking is, in my view, the most important point.

In general, strengthening critical thinking is essential. And on upskilling we saw earlier how to proceed.

Finally, if there's something to take away from this talk: we're in an intense period of transformation. Today you might have come expecting lots of answers.

I haven't given many answers. I probably raised many more questions, in fact, because we don't know what will happen.

Anyone who tells you they know for sure is wrong. Today you must try, test, see what works and what doesn't. What works today may not work tomorrow.

Juniors have a place today and above all you must remain vigilant while being amazed. And that's the best.

Because maybe, since no one has answers, perhaps this talk—at least I hope—marks the start of a long conversation. I hope it gives you topics to discuss among yourselves.

I want to thank Julie because, even though she isn't here today, she wrote most of the plan and thanks to her the talk exists. So thank you, Julie.

I also want to thank the people who gave their time for interviews: Hugo, Lior, Greg—Greg in particular who runs a community called DevWithAI that I invite you to join—Julien and Mathieu who work at Infomaniak, and Thomas.

And finally, that's the end. This was Estéban Soubiran. If you want to give feedback that would be awesome. If you want to come discuss, same. Otherwise, thank you all!
