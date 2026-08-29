Hello everyone. Today, we’re going to talk about Unpoly, a tool for the web.

Before we start, I’d like to poll the room with two questions. Who here has done web development with modern front-end frameworks like React, Angular, or Vue? OK, a solid majority. And who has done web development with back-end frameworks like Rails or Laravel? Far fewer people.

My name is Estéban Soubiran. I’m an engineering student at INSA Centre Val de Loire in cybersecurity and a web developer at ANEO, a consulting agency. I’m also responsible for the association ranking, a project that showcases student associations.

You can mostly find me on LinkedIn or GitHub. During this talk, we’ll follow a thread with a little robot we’ll call Atom, a developer for the association ranking.

For September, his mission is to build a voting platform to evaluate associations’ ability to mobilize their network. Visitors will be able to come and vote on this platform.

Let’s talk specifications to understand the rest. There’s an admin part and a visualization part to browse information about participating associations. We need to allow voting, accept an email address, verify it, store it in the database, and send emails.

We need to display charts to see when people vote, which associations they vote for, and the breakdown of votes between the most and least voted. The site must be SEO-friendly so it’s easily indexable and discoverable on Google when you type an association’s name.

The user experience must be fast and modern, make people want to explore the platform, while staying maintainable and not too complex. Atom doesn’t have much time and has other things to do.

In terms of requirements, the platform must handle 100,000 visits in 30 days, 25,000 votes, and send 45,000 emails. This matters to understand why we want an app that’s maintainable, not too complex, and meets these constraints.

Which stack should we choose? Atom is a bit new to this, he goes on YouTube to see how to code this kind of app and comes across the MERN stack. MongoDB for the database, Express for the server and API, React for the UI, and Node.js to run everything.

His path would be to build a JSON API, manage Express dependencies, structure data for the database, and route the API. He must handle filtering, pagination, sorting, admin authentication and authorization, then production deployment.

Next, he needs to build the front-end with React, choose and configure dependencies, set up routing, connect to the API, iterate when things don’t work, and reimplement authorization on the client. There’s accessibility to address, and SEO isn’t straightforward, so he might need a meta-framework like Remix or Next and a second deployment.

For this voting platform, Atom would need to maintain two servers in production. He has three problems: limited time, too much complexity, and difficult maintenance year after year for a long-lived project.

Our solution for Atom is Unpoly. It’s a small script that lets you build smooth, modern apps while keeping everything server-rendered. The complexity of a front-end framework, the second deployment, and duplicating auth and authorization all disappear because everything stays on the server.

What server-rendered apps do well: choosing mature tools like Rails, Laravel, or Symfony, less complexity than building an API plus a separate front-end, and synchronous data access without multiple AJAX or XHR calls.

The first render is very fast and contains data, which is perfect for SEO. And it works on all devices because we send HTML and content displays even on poor connections.

What works less well: interaction feedback can feel slow, transient state is lost if it’s not in the URL, interactivity is limited for layers like modals and pop-ups, and page-to-page animations are complicated. Handling very complex forms is also trickier.

Unpoly changes the game by bringing these weak points down to an acceptable level. Unpoly is 25 HTML attributes added via a simple script that you can use throughout your app.

The logic stays server-centered: no need to validate or authorize both on the client and the server. It supports all languages since you keep building on the server, and Unpoly is just a bit of JavaScript included in your HTML. It handles navigation, forms, animations, and interactions.

Let’s move to the demo with Unpoly’s main elements. Here’s the voting platform Atom started, fully server-rendered. For now, it’s simple: associations are listed, you can click and filter.

If I click an association, the whole page reloads, and it’s the same when I go back. If I search for an association, it doesn’t scroll to the right place. The app isn’t very pleasant.

Installing Unpoly is simple. It’s a standard NPM dependency, or you can include it via a CDN. Once included, you import it in your JS file if you use NPM, and that’s it: no other client-side JavaScript to write.

First improvement: on the association card link, we add up-target to target the element to replace, for example the element with the layout-main attribute. From now on, when I click, the page doesn’t reload and navigation becomes smooth.

How does it work? Pages are still rendered on the server, but the request is intercepted by Unpoly, which sends an XHR request, retrieves the page, and replaces only the targeted element. The header doesn’t change, so its state remains intact.

We can go further with other attributes. We add up-instant to trigger the action on mousedown for a feeling of instant response. We add up-preload to preload the page on hover so the response is ready on click.

You can see it in the Network tab: the HTML page is preloaded by Unpoly. Let’s look at forms, particularly the association sidebar filter.

The filter is a classic form that puts data in the URL, retrieved by the server. We add up-submit to submit the form without reloading the whole page and an up-target on the association grid to replace only that area.

When filtering, the page doesn’t refresh, the data updates, and scroll is preserved. If we want to jump back to the top of the list after filtering, we add up-scroll with the target ID.

Unpoly handles modals very well. For example, a chart that shows votes by hour currently appears on a dedicated page. We want to open it in a modal: on the link, we use up-layer="modal" and target the element to display, for example a [modal] container.

On click, the modal appears. The chart doesn’t show yet because it’s created with Chart.js and the script hasn’t rerun. Unpoly lets you run scripts based on elements loaded via up.compiler.

We write a compiler that targets canvases within the replaced element and initializes the chart. The callback receives the element and data. With the up-data attribute, that data is automatically passed to the compiler and the chart displays.

In a few steps, we have a modal and a much better user experience. The modal is customizable: it’s a Web Component that you can style with CSS.

On the request side, Unpoly has a cache: going back to a page uses the cache instead of making a new request, which combines well with preloading. Unpoly also adds headers, like X-Up-Mode, so the server can adapt the response.

Opening the link in a new page doesn’t show the close cross, while in a modal it does. The server can detect the mode and conditionally display it, and an attribute lets you close the modal without writing JavaScript.

What we’re building here follows progressive enhancement: strict separation between content, style, and behavior. If JavaScript or CSS doesn’t load, the HTML remains readable.

With Unpoly, it’s just small attributes. Without the script, links are still links and the app works, just with a degraded UX. Think elevator versus escalator: if the elevator breaks, you’re stuck, while the escalator is still usable.

It’s not a one-size-fits-all solution: sometimes a SPA is essential, but that’s not the progressive enhancement approach. On the web, keep control, choose your tools well, and do like Atom: make the right choice and use Unpoly.

People ask whether the entire HTML page goes over the network during an XHR request. Yes, but you can play with headers. Since we know the up-target, the server can choose to render only the useful part.

For example, if we render the association grid, we don’t need to render the filters, which avoids API calls. The page is lighter on the network and we save external requests on the server side.

People also ask whether the CDN version or the NPM version makes a difference. It’s the same library; the difference comes down to integration simplicity depending on the project.
