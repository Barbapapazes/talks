Hi everyone. I'm really happy to be talking to you about AI, and today more specifically about LLMs. Looking at this title, I'm thinking, "Well, that's great, but what exactly is an LLM?"

An LLM is a machine whose only goal is to produce the next token.

Yep, that's it, nothing more. Except that's actually quite a lot already, because its various internal mechanisms give rise to abilities like translating, writing code, planning, and solving problems. Basically, with an LLM, we can do a lot more than just produce the next token.

[inaudible]

The best way to understand that is to approach LLMs from the other side, by looking at what they aren't. An LLM is not a set of hand-written instructions. For example, you won't find conditions inside an LLM like "if the message contains free or urgent, then it's spam."

[inaudible]

If you were to send this message, there wouldn't be rules saying that because it contains the word "urgent", it must be spam. An LLM is more like this.

[inaudible]

For now, it doesn't know how to do anything. The idea is that during training, it adjusts its weights, also called parameters, so it can give us the right next token. To do that, we give it a large amount of text to learn from.

Once it has learned, its weights are fixed. The model no longer has access to the text corpus. That's really important because it means an LLM isn't a database, and it isn't a system that keeps learning on its own.

Once we've done all that, we can send it some text for the LLM to complete. If we go back to our example about the capital of France, it completes the sentence with "Paris".

What's interesting is that we can also ask it to classify a message as spam or not, and it will know how to answer. That's one of its emergent abilities.

I've been talking about tokens this whole time, but what exactly is a token? If we take our sentence, "The capital of France is...", the first step is to split it into pieces. Those pieces are what we call tokens.

In this example, you might think a token is a word, but not necessarily. The word "unbelievable", for example, is split into three tokens. Depending on the tokenizer, a token can be a word, part of a word, or even a character.

For this breakdown, I used the tokenizer from OpenAI's older models. Each token corresponds to an ID in the model's vocabulary. It's just a number, and two numbers being close together doesn't mean the tokens are similar.

That number lets us look up an array of numbers called an embedding. This representation, which is the word's meaning as seen by the machine, was learned during training.

We started with a sentence, split it into tokens, and now we have numbers the model can use. Okay, so we have our tokens, each represented by a list of numbers. What do we do with them now?

We send their embeddings into a transformer, which is this big box on the slide. The first step is attention. It lets each element gather information from the tokens that come before it and from itself.

In practice, this means we can give the little word "is" information about "capital" and "France". Then we go through the MLP, which takes all the information and transforms it into a new vector.

We repeat these two operations across several layers. The representations of the tokens change as we go.

At the end, we take the representation of the last token to calculate a score for every token in the vocabulary before converting all those scores into probabilities. To put it as simply as possible, "Paris" has a 78% chance of being the next token.

If we take our example, "The capital of France is", the LLM calculates a score for each token in its vocabulary. Then an algorithm decides which token to select next. Here, it chooses "Paris", which we add to the end of the sentence.

We repeat this process until the LLM decides to stop.

Now that we've seen how our LLM works, let's go back to its original task, selecting the next token. What's interesting is that this ability lets us get it to do three things.

Generate text and answer us.

Reason through more complex problems, taking some time before answering.

Call tools to take actions and interact with the world.

If we take reasoning, for example, when the model faces a complex problem, it uses its text generation space to generate more information. It thinks. Its goal is to get a clearer picture so it can find the right solution.

This reasoning is still text, just like the answer it gives to you, except it has learned that this text isn't meant for you, so it's free to put whatever it wants in there. Once it has thought things through enough, it generates the text that gives us the answer.

For tool calling, the idea is that the LLM generates a special kind of text intended for the system around it. When the system detects that text, it picks it up, runs an external function, and gives the result back to the LLM.

[inaudible]

The interesting point is that this is structured data. This is JSON.

Okay, pretty cool, we've covered a lot. What should we take away from all this?

An LLM learns patterns. It's not hand-written rules. It goes one token at a time, using the context to predict the next token, and then repeats.

Reasoning generates tokens, and tools run outside of the model. The system runs them. The model can work through a problem or request a tool.

How LLMs work is clearer now. Let's take a moment to understand an LLM spec sheet, so we can make sense of the announcements when a new LLM comes out. Here we have three spec sheets.

The question is, how do we read them? GPT-6.1-sol, Claude Opus 5.5, and DeepSeek V4 are the names of the LLMs, the names of the models.

Parameters is the number of parameters. [inaudible] We don't know. For an open model like DeepSeek-V4, it is 1.3 trillion parameters, with only 49 billion active parameters.

The context window is how many tokens we can fit into a single request at most. We can go up to 1 million tokens, and one token is about 4 characters, so we can put a lot of books into 1 million tokens.

Weights tells us if the model can be downloaded and installed on your computer. For open weights, like DeepSeek-V4, it means that you can download the model, which is like an executable, and run it on your computer.

You won't be able to run DeepSeek V4, but you'll be able to run a smaller model, like a 0.8B model, on your computer and even on your phone.

Thank you, everyone. I'm Estéban Soubiran. If you have any feedback, the first QR code is the place to leave it.

The second QR code lets you subscribe to the newsletter so you don't miss any of the upcoming episodes. Thank you.
