# Notes

## Good default fields

Ommited features that users can easily implement themselves via custom fields

- Status (todo, in-progress, review, complete)
- Product (Solitaire, etc.)
- Story Points
- Sprint
- Priority
- Assignee

## Ideas

- Unit
  - A unit of work. May contain sub-units. 
- Create "views" of units based on parent unit, grouping (assignee, product, status, etc), filters, and sorts.
  - Kanban view
  - Table view
  - Map view: A map of stuff
    - Group (group by any field e.g. Product)
    - Weight (choose numeric field to add weight to groups e.g. Story Points) Height-weight groups show up larger on the map
    - Annotate (choose fields to display values from the group e.g. Assignee)
  - Timeline view
- Allow dragging between groups to change the group (be it assignee, product, status, etc)
- Collection
  - The root of everything. Begins with an empty list of Units
  - Fields are set at the collection layer and apply to all units
  - An organization may have a single collection. '
  - Tasks cannot be shared between collections, because they may have varying fields.
  - There could be tools to move units between collections.
- Layer:
  - I went back-and-forth about whether people should be able to set pre-defined layer depths. I think it will be cleanest to allow available depths to be derived from the unit heirarchy.
  - It may still make sense to allow layers to be named for readability.

## TODOS

Omitted features to focus on the core Project Management features for now

- Comments
- Accounts / Permissions (team based)
- Server-side anything (everything will be client-side for now)
- Multiplayer
- Unit dependencies
- Stard/end times
- Teams field
- View folders