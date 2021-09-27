### If you are a participant in ContriHUB-21, then you are suggested to follow these tips/guidelines.

1. Implement UI of all new features in line with the theme of the App. i.e. [THE MATRIX](https://en.wikipedia.org/wiki/The_Matrix_(franchise))


2. Always use separate files for styling the components.
> Ques: I don't understand how stylings are done in this project.

> Ans: '**styled-components**' is a nice library for applying styling to react components. Go through '**https://styled-components.com/**' and the **source-code** of Leetsolve itself to get the gist of it.

3. **Best Practices** during development (*some are applicable to this project only*)

   - Because all electron.js application uses chromium engine(for rendering) which is just a browser, you should use "**ctrl + R**" to reload to allow the changes in front-end code to take effect.

   - If changes are made in **main.js** or any **module imported** to it, you have to restart the Application for the changes to take effect.

   - Make **dev-tools** open by default when launching the Application. (as this is the place where we will be encountering/resolving most of the issues)

4. The [API](https://leetcode.com/api/problems/algorithms/) response from leetcode.com may get timed out when fetched at very short intervals. So, for faster development of features that may have dummy data, you may use '**src/DummyData/smallResponse.js**' (more details on this in **main.js** as comments).

5. API response structure is illustrated in '**src/DummyData/responseStruct.js**'.

6. If you're stuck on an issue and having a hard time understanding the source code for where to even start. Feel free to contact [me](https://github.com/ankitsangwan1999) over the thread of that issue.