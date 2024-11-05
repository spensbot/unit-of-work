# Unit of Work

Unopinionated project management software. Simple-by-default. Opt-in complexity where you need it.

## Current PM Software landscape

The current PM software offerings are quite lacking, and can be split into a couple categories

### Simple/Flat

Asana, Trello, Monday

Tasks are simple and unrelated. Takes lots of grooming to maintain multiple levels of information

### Complex

Jira

Tasks have varying levels of hierarchy. And there can be multiple complex rules

## Core Ideas

What makes Unit of Work different from other PM Software?

### Hierarchy

Tasks (Units) can be nested to an arbitrary level of depth (to reflect the nature of real work). If a task is too large/complex to be completed in a reasonable amount of time, break it up into sub-tasks!

*NOTE: Potential Admin options to configure depth limits and set level names (e.g. initiative, epic, task, subtask in Jira)*

### Field Propogation

Fields can be configured to propogate up or down to simplify/eliminate field maintenance

### No Project Board.

IMO a project board isn't a good abstraction. Depending on use case, a board could serve one of many purposes, each with drawbacks.

- Team (e.g. Platform Team Board)
- Product (e.g. Game X Board)
- Project (e.g. New Feature Board)

### Portfolios & Views (Project Board Alternatives)

A portfolio may contain any number of units/subunits. These units all share common fields that are defined for the portfolio. 

This allows all units to be viewed with various filters, sorts, groups, and levels of detail.

This setup provides the same features of any Project board, while being able to switch seamlessly between them:

- Team -> Create a team field
- Product -> Create a product field
- Project -> Create a portfolio root unit for each project

It would be advisable to create a portfolio to contain any/all projects that may interact and/or need to be viewed together.

#### Jira Similarities

Portfolios are similar to Jira Company-Managed Projects (as opposed to Team-Managed) in that all tasks share fields. Views are similar to Jira cross-project boards in the context of Company-Managed Projects.

## Why is it better?

Unit of work's structure makes it simple to view many rich representations of ticket status' without any maintenance (it requires lots of work to do the same in one of the simple PM softwares)

Unit of work is still very simple, making it more understandable, user-friendly, and requiring less maintenance than Jira (hopefully)