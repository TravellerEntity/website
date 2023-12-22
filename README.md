# TravellerEntity/website
[![Netlify Status](https://api.netlify.com/api/v1/badges/8d83bd7c-006a-47db-bb8b-32148b663d87/deploy-status)](https://app.netlify.com/sites/travellerentity/deploys)

Files for my personal website.
Contains:
- Social links
- Information about me
- Various programming projects

All source code and assets are stored here. Go to [entity.codes](https://entity.codes) to view the latest changes.

Alternatively, visit one of the following mirrors:
- [travellerentity.xyz](https://travellerentity.xyz)

# Creating New Pages
## To show in "Projects" on the homepage:

In the front matter of a `.njk` or `.html` file anywhere in `/src`, add these tags. `thumbnail` can be omitted if
an image thumbnail is unnecessary.
```
tags: homeitem
title: TITLE_HERE
description: DESC_HERE
thumbnail: /path/to/image.png
```
## To show in blog:

In the front matter of a `.md` file in `/src/blog/post`, add these tags. `thumbnail` can be omitted
if an image thumbnail is unnecessary.
```
title: TITLE_HERE
dateText: MONTH DAY, YEAR
description: DESC_HERE
thumbnail: /path/to/image.png
```
