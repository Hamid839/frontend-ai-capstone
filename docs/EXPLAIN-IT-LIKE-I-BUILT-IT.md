# How My AI Chat Assistant Searches My Portfolio Projects

One interesting part of my portfolio is the project-search tool behind my AI chat assistant.

I wanted the assistant to answer questions about my projects using actual information instead of making things up. So I created a tool that searches through information about projects like MedNoviAI and FocusBoard.

When someone asks a question, the tool takes the search words and cleans them up. For example, it converts them to lowercase and removes unnecessary words. It then checks those words against the names, descriptions, technologies, contributions, and features stored for each project.

After that, it calculates how closely each project matches the question and puts the most relevant ones first. It returns the matching projects with their details, so the chat interface can display them as project cards.

I also added a limit so the tool doesn't return too many results. If nothing matches, it returns an empty list instead of pretending that a project exists.

The main thing I learned is that an AI assistant doesn't have to make up every answer itself. I can give it a tool with access to information I've provided, and that tool can find relevant data for the assistant to use.

This helped me understand how the search logic, structured data, and AI chat feature work together in my own project.