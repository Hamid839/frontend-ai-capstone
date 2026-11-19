# Agent Concepts and MCP Basics

**Student:** Hamid Shoukat  
**Assignment:** FL-05 — Agent Concepts and MCP Basics  
**Track:** General AI Fluency

## 1. What is an AI workflow?

An AI workflow is a process in which an AI model and other tools complete a task through predefined steps. Each stage has a specific responsibility, and the output of one stage becomes the input for the next. The order of execution is already decided by the person who designs the workflow.

For example, a writing workflow might gather information, prepare a draft, review it for mistakes and then produce a final document. The AI helps perform each step, but the overall process follows a structure that was decided in advance.

Workflows are useful when a task is predictable and can be divided into clearly defined stages. They are easier to understand, repeat and evaluate because the process remains consistent.

## 2. What is an AI agent?

An AI agent is different because it can decide how to approach a task rather than simply following a fixed sequence of instructions.

An agent receives an objective, examines the available information, decides what action to take, uses tools when necessary, observes the results and decides what to do next. It can change its plan if the first attempt does not work or if it discovers something unexpected.

For example, imagine asking an AI assistant to investigate an issue in a GitHub project. It could inspect the project structure, identify the relevant files, trace the affected feature, investigate the error and decide which additional information it needs. It may repeat some steps or ask the user for clarification before producing its findings.

The main difference is that a workflow follows a predefined path, whereas an agent has more control over its process and tool selection. An agent does not necessarily need to operate without human supervision. It can request approval before making important changes.

Anthropic's article, *Building Effective Agents*, explains this distinction and recommends starting with the simplest solution that meets the requirements rather than adding unnecessary complexity.

## 3. What is Model Context Protocol (MCP)?

MCP stands for Model Context Protocol. It is an open standard that allows AI applications to connect with external systems through a common interface.

Without an external connection, an AI assistant mainly works with information already available in its conversation or information supplied by the user. With MCP, it can access additional information and capabilities from connected services.

For example, an AI assistant connected to GitHub can inspect repository files. A filesystem connection can provide access to selected local files, while a database connection can expose information stored in a database.

MCP uses a client-server architecture. The AI application acts as the host, an MCP client manages the connection, and the MCP server exposes the available capabilities.

## 4. The three main MCP primitives

MCP provides three important primitives:

**Tools:** These are executable functions that an AI application can call to perform operations. Examples include searching a repository, querying a database or creating an issue. Tools allow the AI to take action instead of only generating text.

**Resources:** These provide information that the AI application can access as context. Examples include repository files, documentation, database records and other data. Resources help the AI understand the information it is working with.

**Prompts:** These are reusable templates that help structure interactions. They can define instructions, expected inputs and a consistent approach for completing a particular task.

In simple terms, tools perform actions, resources provide information, and prompts provide reusable instructions. They work together to make an AI application more useful.

## 5. Classifying my FL-04 workflow

My FL-04 assignment was to build a Technical Learning-to-Documentation Pipeline using a Claude Project.

It contains four predefined stages:

1. Gather and organize technical information.
2. Synthesize the information and prepare a draft.
3. Critique the draft for technical accuracy and missing information.
4. Revise and format the final document.

I classify this as an **AI workflow, not an autonomous agent**.

The reason is that I designed the four stages in advance and instructed Claude to execute them in that order. The AI does not independently decide which stages to use, select external tools or change the process based on the results.

Although the workflow includes an evaluation and revision stage, that does not automatically make it an agent. It remains a predefined process.

## 6. My GitHub connector experiment

For this assignment, I selected GitHub as my external connection because my FlyRank capstone repository contains my source code and internship documentation.

The purpose of connecting GitHub to Claude is to let it work with actual repository information rather than depending entirely on files and code that I manually paste into a conversation.

I plan to demonstrate three tasks:

- Inspect the repository's README and package configuration to identify the actual technology stack.
- Review my internship documentation and compare files to identify missing evidence.
- Investigate the chat feature by inspecting its frontend component and server API route.

These tasks demonstrate how an external connection provides access to project information that ordinary conversation does not automatically contain. I will record the actual connector activity and results as evidence.

## 7. How I would upgrade FL-04 into an agent

One concrete improvement would be to turn my Technical Learning-to-Documentation Pipeline into a repository-aware research agent.

Instead of always following the same four stages, the upgraded system would receive a technical topic and decide what information it needs. It could search connected GitHub files, inspect relevant documentation and select the sources that match the topic.

If the input is an error report, it could inspect the relevant source files. If the input is a learning topic, it could search for official documentation. It would then create a research plan, gather information, prepare notes, review the results and decide whether additional investigation is needed.

For example, if it discovers that an API explanation does not match the code in my repository, it could investigate the relevant route before completing its document. It would also have a stopping condition and ask for my approval before making changes to any project files.

This would make the pipeline more flexible because the AI would decide which tools and investigative steps are necessary instead of following only a fixed sequence.

However, I would keep human approval for important technical decisions and final verification. The purpose is not to remove human judgement but to reduce repetitive research and documentation work.

## Conclusion

This assignment helped me understand that workflows and agents are related but not identical. A workflow follows a predefined process, while an agent can dynamically plan and use tools to achieve an objective. MCP provides a standardized way for AI applications to connect with external tools and information.

My FL-04 project is currently a workflow. My proposed upgrade is a repository-aware research agent that can investigate different technical inputs and choose its next steps based on what it discovers.