Hello everyone, and welcome.

Today, we're going to talk about a topic that's very close to my heart, something we tend to use a lot, but don't necessarily understand deeply. Today, we're going to talk about signals and reactivity.

Before we go any further, I'd like to suggest that we take a quick group photo together. If you don't want to be in the photo, put your hand over your face. Everybody smile. Great.

That's for the keepsake side of things. Before we go any further, I invite you to scan this QR code with your phone.

It will take you to a page where you'll be able to find my various social accounts. You'll also be able to answer some questions. For now, don't do that yet, we'll do it as we go along.

You can also ask questions in real time if there are things you don't understand. I can answer them if it's relevant at that moment. You'll also have the chance to give me feedback, preferably at the end so it can be as objective as possible. And at any point, you can react to what I'm saying if you find it funny, interesting, or if you simply agree.

This is great, everything is working.

To get started, what we're going to do is find out what technology you use for your front-end, what framework you use. Either you answer the first question on the page you just arrived on, or you can scan the QR code up here in the top-right corner.

What's interesting is that today we're going to talk about signals and reactivity. In the end, whatever framework you're using, for a majority of you it's Angular... If you use React, too bad, you're the only ones who don't have signals. It's okay.

But for everyone else, what's nice is that today we're going to talk about signals and reactivity at a low enough level for everyone to understand what we're going to discuss, no matter what language you use. Overall, we've got a lot of people doing Vue, that's cool, I like you. We've got a lot of people doing Angular. And then there are other frameworks being used too.

I like to start this talk with this equation that tells us UI equals fn(state). This equation usually fits React particularly well.

In React, our user interface is the result of a function, literally in JavaScript. So our fn here takes props as input. And we can break this equation down into three main parts: our user interface, our function, and our state.

What's nice about reactivity and signals is that we can actually reuse that same equation. And instead of having a function in fn, the way we might in React, we're going to imagine a black box instead.

We're going to imagine this fn as a black box and say that it's our reactivity system. The whole goal of today's talk is to demystify that fn. And what we're going to say is that our interfaces are driven by state. So our UI is going to be driven by a black box that takes state as input.

In fact, this is a concept you all know and have already used through an Excel spreadsheet.

Here, we have an Excel spreadsheet with three rows and three columns. We can see that in column B, we have a quantity of things. In row 2, we have a unit price per item. And finally, we have the total.

As in any Excel spreadsheet, we can insert a formula. Here, in B3, we can see that the result is equal to B1 times B2.

And of course, as in any Excel spreadsheet, if we change the quantity so that instead of 0 we set it to 1, or even 3, we can see that the total updates automatically. We really do have an interface driven by state: we changed the state, and our interface reacted automatically.

Obviously, today we're not here to talk about Excel, but rather about this.

What we see here is exactly like our Excel spreadsheet from earlier. We're going to have a quantity of things, a price, and then we'll compute a total which, just like our B3 cell, will be the result of quantity times price. And then we'll display something in the console.

What's interesting about the library we're going to use here is that we're going to talk about Alien Signals.

Alien Signals is a library developed by Johnson Chu, who works a lot on Vue.js reactivity and also on the whole Vue.js LSP ecosystem, especially Volar. He ran into performance problems and asked himself how far reactivity could be pushed to make it as fast as possible. That led him to develop Alien Signals, which is now the most performant implementation of signals in JavaScript.

What's also interesting about Alien Signals is that its public API, which we see here, is built on top of internal APIs that make it possible to recreate the signal implementations of all frameworks, including the TC39 one for the potential standardization of signals in JavaScript.

What's nice about Alien Signals is that it's low-level enough for all of us to start from the same place and understand together what's going to happen. Our goal, just like with the spreadsheet earlier, is that if quantity goes from 0 to 3, we can see here that our total is now 45. The whole goal of the next few minutes is to understand how, by changing quantity here, this thing knows it has to run again in order to display a new total.

Let me introduce myself: my name is Estéban Soubiran, and I'm an engineer at Takima.

In my free time, I mostly orbit around the Laravel, Vite, Vue, and Nuxt ecosystems. And when I have any time left, I write articles, recently about Vite plugins or Markdown plugins, among other things.

You can find me pretty much everywhere, mainly on LinkedIn, from time to time on Twitch when I have the time, and otherwise on my website. But we're not here to talk about me, we're here to talk about Alien Signals and understand what is going on under the hood.

Before we really dig into the topic, we're going to do a little math. We're going to do a bit of graph theory.

In graph theory, we have two major elements. The first is the node, which we represent here as a square, and it's basically where the different computations happen.

Of course, in our graph we can place different nodes and connect them with lines that we'll call links, edges, links. It's all the same thing. And here, what's interesting is that between A and B, we don't just have a standard link, we have a link with an arrow. Today you're lucky, because you can actually see the arrows. On previous occasions, they weren't visible.

We can add other nodes. Here, we add C, and we have another arrow from B to C. So now we can say that our graph is directed, because we can only go from A to B and then from B to C. Once we get to C, we can't go back.

Obviously, since we're working with a graph, we can add many more nodes. Here, we've added D, E, and F, again with arrows to give us the direction in which the graph can be traversed.

Now we say that we have a directed graph, and on top of that, one that has no cycles. In other words, once we've reached the end of the graph, we can't go back to the beginning. So we have an acyclic graph.

If we start from A, go to B, then to C, we can't go back anywhere. On the other hand, if we imagine a link from C to A, then we'd have a cycle, because we could do A, B, C, go back up to A, and so on. But that's not the case here.

In directed acyclic graphs, we have an interesting property called topological sorting.

A topological sort is a linear ordering of the nodes such that each starting node comes before the destination node in the ordering. In other words, to reach the next node, we must already have gone through all the nodes connected to it.

If we take A, for example, what we're going to do is check whether it has parents. Does A have parents? Yes, it has one parent, D. Have we gone through D? No.

You really need to think of topological sorting as a kind of list in which we're trying to classify our different nodes. Since we haven't gone through D, we can't start with A. So we look at D: does D have parents? No. D has no parents, so we can start with D and place it in our list.

Then we can go back to A. We look again: does A have parents? Yes, D. Have we gone through D? Yes, so we can take A.

Then we can move on to B. Does B have parents? Yes, A, D, and E. We haven't gone through all three of those yet, so we can't take it just yet. That's how we're going to sort our graph. For example, we could do D, then A, then F, then E, then B, then C.

What's interesting is that for the same graph, you can have multiple topological sorts. We could just as well have started with F and done the same thing.

There's a second kind of graph that will matter to us later: the doubly linked list.

In a doubly linked list, what's nice is that we can also represent it as a graph, with a node A connected to a node B. But this time, we're going to create one link from A to B, and another from B to A.

Why do we call it a doubly linked list? Because it's a list where the elements are linked together, and linked twice because we can move from A to B and from B back to A. Obviously, if we add more elements to our graph, we also need to link them both ways. In that case, we're dealing with cyclic graphs because we can go from A to B, from B to C, and back to A.

That was the math part, basically the easiest part. I hope you're still with me, because now we're going to move on to the most interesting part, which is the code.

As a reminder, this is the example we've been using from the beginning, with our quantity, our price, our total, and finally a function that lets us display things.

Why did we spend some time on graph theory just before this? Because it's going to help us visualize what's underneath these lines of code.

If we take our signals, for example, we can say that they're the place where computation happens, where things are going on, so we can represent them as nodes. Here I have two nodes: the quantity node and the price node.

Then we can do the same with our computed and represent it as a node. And we can connect quantity to total and price to total. Why? Because we can see here that they appear inside the callback function.

Then we can do the same for the effect: we'll represent it as a node, and we'll connect total to effect. So now we have a representation that's fairly logical.

In other words, computed contains quantity and price, so we have those two arrows here. Then effect contains total, so we have that arrow there. That's the logical representation. But if we tweak our graph a little and instead look at a representation of how these things communicate with one another, we can represent it as a doubly linked list.

In that representation, each element is connected to the others with two arrows, which will later let us move from quantity to total, from total to effect, from effect back to total, and then on to price.

What matters here is not that it necessarily looks exactly like this, but that it gives you a visual idea of what it could look like. And for what we're going to see next, that can help if you're the kind of person who understands by visualizing.

Now what we're going to look at are these four APIs, which are actually Alien Signals' public API, and how, in the end, we get that famous total equal to 45.

These are the four functions in the public API. We're not going to spend too much time on effectScope. We're mainly going to focus on signal, computed, and effect.

There's one property here that's extremely important: subscriber and dependency. That's a really important point to understand. Something can either be a dependency of something else or a subscriber, meaning subscribed to a dependency.

A signal is the basic element into which you'll assign a value, or from which you'll retrieve the value that was assigned. It's a box where you put a value or retrieve it, and that's a dependency.

Then you have computed, which is a read-only function to which you pass a callback function, and which returns a function. Computed is a subscriber because you can pass dependencies into its callback function. But it's also a dependency, because a computed can be used inside another computed.

Then you have effect, which is a subscriber because you can give it signals or computed values, and so it will subscribe to dependencies.

Then you have effectScope. It is only a subscriber, and it creates a kind of closed boundary in which you prevent reactivity from leaking out. But that would be the topic of another talk.

Now that we've seen that, we can dive into the actual Alien Signals source code. From this point on, all the code you're going to see comes straight from Alien Signals' source code. It hasn't been modified, so we're really going to examine it in detail and understand it.

What we see here is the signal and its implementation. We pass it a value, and then we get a signal getter-setter with a .bind.

Great, but we don't really understand much yet. So what we're going to do is jump directly into the signal getter-setter. For computed and effect, we'll do exactly the same thing later, but I'll skip the introductory part.

If we go into SignalGetterSetter, what we see is 19 lines, actually split into two parts. The first goes from line 2 to line 13, then from line 13 to line 18. In the first part, we're in setter mode, so we'll deal with that in a moment. In the second part, from line 13 to line 17, we're in getter mode, which means we're retrieving the signal's value.

What we're going to do is check whether there's an ActiveSub. If there is, we're going to create a link, an actual object, and give it both to ourselves and to the ActiveSub.

By creating a link and giving it both to ourselves and to the ActiveSub, we become doubly linked to the ActiveSub. That's where the idea of a doubly linked list comes from. And then, in the end, we return the value stored inside the signal.

Then, in the first part, we're in setter mode. We're going to check whether the value being assigned is the same as the one already stored inside. If it's different, we're going to retrieve the subscriber, propagate something to the subscriber, and then process the effects.

We process the effects in a second step, after propagation, because if your signal appears multiple times in the effect, this avoids running the same effect multiple times. That's why those two stages are clearly separated.

But there is still this propagate step. We don't really know what's happening there. It would be nice to know a bit more, because it looks like the heart of the system. To understand that, we need to look at the different types of reactivity.

The first kind of reactivity is push-based reactivity. Here, we're going to take the dependency's point of view. Let's imagine we're inside quantity, we assign it a new value, and what we'll do in push mode is take that new value, go and see all of our subscribers, and tell them: here's my new value.

That's a system that's very easy to understand and very easy to implement, but it has one major flaw: when the dependency hands its value to the subscriber, it has to do so recursively until it can't go any further. If you have a huge tree of dependencies and subscribers, you have to traverse the whole thing and potentially recalculate everything.

So there's a second way to do it, more in pull mode. Here, you'll take the subscriber's point of view and look at your dependencies. Regularly, you'll go and ask them: "Hey little dependency, have you changed?"

You'll do that often enough to have a somewhat reactive system, because in reality you're clearly dealing with polling. So the granularity of your reactivity depends on how often you're able to check your dependencies. And that's a problem: it's not really reactive.

It also creates performance problems, because your subscribers are constantly checking all their dependencies.

So we said to ourselves: if push isn't great because it's not very performant, and pull isn't great because it isn't really reactive, then let's do both at the same time: push-pull.

In a push-pull system, instead of pushing the value, what we do is go to our subscribers and raise flags for them. We tell them: "Hey subscriber, I changed. I'm not telling you what happened, but I changed."

For example, when we read total, total will look at itself and say: "I've changed, I need to go fetch the new values, recalculate myself, and then I'll be able to do what I need to do."

In Alien Signals, we're not in push-pull, we're in push-pull-push, but that would be the subject of another talk.

Let's go back to our signal. Here, inside propagate, what happens is simply that we go look at our subscribers, raise flags, and tell them: "I changed."

What's nice is that now we can go look at what happens inside a computed, which is both a dependency and a subscriber.

And there they are, our flags. When we activate the computed, it checks those flags and introspects itself. It asks: do I need to run because this is the first time and I've never run before, or am I pending? Did one of my children tell me that it changed?

If that's the case, then it runs its callback function. Then, just like the signal, it checks whether there's an ActiveSub. If there is, it creates a link, an object, and gives it both to the ActiveSub and to itself so that they become doubly linked.

It also checks whether there's an ActiveScope. That's for effectScope. You can ignore that part. Then it returns its value.

Now we can look at what happens inside effect.

In effect, we see an ActiveSub. We see that we're going to save the previous subscriber, set the new one, run the callback function, then restore the previous subscriber into ActiveSub and stop tracking.

ActiveSub, in Alien Signals and in all reactivity systems, is a global variable shared across the whole system, into which we place the subscriber and then run the callback function. In other words, the whole reactivity system relies on one thing only: a global variable.

So there's no magic. There's no hidden JavaScript function. Everything goes through a global variable. It's actually pretty simple.

If we go back to our earlier example, what happens? We're going to propagate changes to our parents. In this case, we don't have any parents, so we do absolutely nothing. We just put the value 0 into the signal. We do the same for price and put the value 15 into the signal.

Then we go into our computed and run our callback function. Or rather, when we run all of this, as we saw, if there's an ActiveSub, things happen. What I didn't show you is that when it checks those flags in processComputedUpdate, it passes computed in as the ActiveSub, because we said a computed can be a subscriber. So computed becomes the ActiveSub.

Then quantity gets called in getter mode. We saw that when a signal is called in getter mode, we link quantity to computed. Then we call price in getter mode. Same story: there's an ActiveSub, it's computed, so we link computed to price. By now, you're probably starting to picture again the graph we drew earlier.

Then we have the effect. Same thing: it becomes the ActiveSub, it runs its callback function. Total gets called in getter mode, creates a link, gives it to itself and to the effect, and the effect gets linked to total. Then that's the end of the story.

But because this example is a bit too simple, I decided to make it slightly more complex. We add quantity and price here, inside the effect.

And that gives us this beautiful diagram. There you go, that's the reactivity system.

Here in red, you have the subscribers, and in blue, the dependencies. We can see that total is both red and blue, because it is both a dependency and a subscriber.

When we run total, meaning the computed, inside its callback function we have quantity being run in getter mode. So we create a link and give it both to quantity and to total. Then in the callback function there is also price. When it runs in getter mode, we check whether there's an ActiveSub. It's total, so we create a link and give it both to total and to price.

We do the same thing for the effect. Earlier, we only displayed total, but we added price and quantity, so we create the links in the same way. Between each link, we can see there's a doubly linked list that lets us move from link to link. There are times when there isn't one, because it simply isn't needed later on.

Here you have the graph of the links between the different pieces of the reactivity system. If there's one thing to remember, it's this. But you can always come back to it later, the slides are available.

At this point, we've understood how the reactivity system works. But in reality, reactivity also comes with several problems. There are four of them, and they are problems that have no mathematical solution.

In fact, it's in the way these problems are addressed, or at least in the attempt to solve them, that different reactivity frameworks distinguish themselves.

The first one is the glitch problem. If you have a node tied temporally to time, running it first or second relative to another node won't necessarily produce the same result. Here, your framework will choose a solution, but today there isn't a precise solution that resolves this absolutely.

Then you have cyclic dependencies. In a graph with cyclic dependencies, you can end up going in circles inside your graph. At what point are you supposed to stop? When you've gone around once? When you've resolved it? Once again, it's your framework that decides how to implement that.

Then you have interactions with mutable state. For example, you have an array in one of your nodes. You modify that array. Do you rerun the graph computation?

And then you have dynamic graph updates. You start resolving a graph, and then at some point you add a node or remove one. Do you restart the calculation? Do you throw an error? Once again, that's not your job to handle. Your framework chose a particular way to respond to that problem. And it's the answer to those four problems, among others, that differentiates the various frameworks.

But all of that is very nice. What I find even nicer is that we're in the JavaScript ecosystem, and there's one thing we love doing in the JavaScript ecosystem: creating new frameworks.

So we're going to create a new front-end framework. And there you go: this is a front-end framework.

And now you're thinking: "But Estéban, you're crazy, this isn't a front-end framework." Why? Because at the very beginning of the talk, we said we had state.

We have a signal into which we put some value. Here we set a count to 0. Then with that count, we take body.innerHTML and modify it with the value of count. Then we wrap all of that in an effect. And finally, we update the state.

When we update the state here, our HTML updates because our effect runs again. So we really do have our user interface, our UI, which is equal to a function of state.

So we do have a new front-end framework. In the end, it wasn't that complicated.

And now you're going to say: "Thanks, Estéban, for this lovely demonstration, but real life doesn't work like that." In real life, it does work like that.

This isn't simplified, because it's exactly those three lines you see there. You have to go look for them, they're in Vue.js. Those three lines in Vue.js are exactly the same lines as what we had on the previous slide.

First, we start a scope. We basically wrap reactivity in it. Then what we do is create what they call a reactive effect.

In Vue.js, you have your SFC components. You have the script section and the template section. Inside that, you're going to have two things: your script, where your signals live, because in Vue.js, refs are closely related to signals.

When a ref updates, your effect is going to run again. And inside that effect, you have the template that needs to be updated.

What's interesting to note is that here we're talking about component, and here we're talking about scope. I told you earlier that the scope creates a reactivity boundary.

That means the granularity of reactivity in Vue.js is at the component level. So when you change a signal or a ref inside the script of a Vue.js component, the entire component gets recalculated.

And that differs depending on the framework. Qwik or Solid have finer-grained reactivity. And in Vue Vapor, which is coming in 3.6, reactivity will no longer be at the component level but at the DOM element level. Those three lines explain that.

If you want to learn more about signals and reactivity, you can go look at Alien Signals' source code. 200 or 300 lines of pure joy.

It doesn't really look like JavaScript anymore, but if you're not a huge JavaScript fan, there are reimplementations in just about every language, because the logic and the math behind Alien Signals are language-agnostic. There have been ports in Go and PHP.

You can also watch the video "Reactivity across frameworks", which explains the different kinds of reactivity and the different levels of granularity. And if you're not really into watching videos, there's also an article that explains roughly the same thing.

I encourage you to stay curious and keep learning. Thank you all, this was Estéban.

If you have any questions, now's the time.

The question was whether there are signals in standard Vue.js. The answer is yes. Signals have been in Vue.js since version 3. In fact, they've even been there since version 2.

With Alien Signals, you can reimplement Vue.js signals. And today, all the optimization work that has been done in Alien Signals is being brought into Vue.js reactivity starting from version 3.4.

One part was done in 3.4, another in 3.5, and another is coming in 3.6. All the performance gains come with absolutely no breaking change for the end user. And in 3.6, Vue.js will become one of the most efficient frameworks in terms of reactivity.

Maybe the question was also: should you use Alien Signals in Vue.js? The answer is no, because you already have Vue.js reactivity, and in fact it's the same thing. By understanding this, you understand Vue.js.

Then, if you want to use it in React, since React doesn't work at all this way, you can use Alien Signals in React. Some bridges have been built to make that work. There is a community port of Alien Signals to React code, and I think it works very well.

The next question was: has it been ported to other languages besides JavaScript? Can we have the same reactivity system on the back end? Yes.

Whether that's useful on the back end, I don't know. But given that the whole thing relies on a global variable and that the algorithm behind it has been ported, you can have that sort of Excel-like system, with reactive interfaces or reactive elements in your code, in the same way.

After that, you'll probably have other problems. But yes, it's possible, it has been done, and it works very well.

If there are no other questions, that's great.

The graph? I don't know, I stopped counting. No, it's long, it takes a lot of hours.

One last question: is the slide deck available? Yes, there's a link at the end.

All my slides are on my website, at /talk. They're all there. These ones will be uploaded soon, but since the link has already been shared, you can find the same slides from other conferences.

My pleasure. Thank you.
