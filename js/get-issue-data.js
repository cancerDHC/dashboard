// CCDH GitHub Repos
const repoBaseURL = "https://api.github.com/repos/cancerDHC/";
let allRepos = [
  {name: "operations", data_pages: 1},
  {name: "community-development", data_pages: 1},
  {name: "data-model-harmonization", data_pages: 1},
  {name: "Terminology", data_pages: 1},
  {name: "tools", data_pages: 1}
];

// checks to see if issue is a pull request or issue.
// returns true if issue; false if pull request.
function isGHIssue(url) {
  if (url.search("/pull/") >= 0) {
    return false;
  } else {
    return true;
  }
}
//Creates a unique ID for each GitHub issue.
//Because we're gathering issues across multiple
//repos, the syntax of the id is:
// [repo name] + "Issue #" + [GitHub issue number]
function getGanttID(repoName, issueNumber){
  const str = repoName + " Issue #" + issueNumber;
  return str;
}

//Gets the task start or date from the GitHub issue
//milestone. Milestone should contain the phase (e.g.,
//"Phase 2") and quarter (e.g., "Quarter 2"). Tickets
//marked "ENDS" are truncated quarters, ending after two
//monts. Note that each phase starts in quarter 2 (4/1) and
//ends in quarter 1 of the next calendar year.
// opt = 0 gets the start date; opt = 1 gets the end date
function getGanttDate(milestone, opt, title) {
  let date = "";
  let str = "";
  if (milestone != null) {
    if (milestone.title != null) {
      str = milestone.title.toLowerCase();
      if (str.search("phase 2") >= 0) {
        //Phase 2 (Pilot): April 2020 - March 2021
        if (opt == 0) {
          date = "2020-04-01"; // default is start of Phase 2
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2020-04-01";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2020-07-01";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2020-10-01";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2021-01-01";
          } else if (str.search("ends") >= 0) {
            date = "2021-04-01";
          }
        } else if (opt == 1) {
          date = "2021-03-31"; // default is end of Phase 2
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2020-06-30";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2020-09-30";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2020-12-31";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2021-03-31";
          } else if (str.search("ends") >= 0) {
            date = "2021-05-31";
          }
        }
      } else if (str.search("phase 3") >= 0) {
        // Phase 3 (Production): April 2021 - March 2022
        if (opt == 0) {
          date = "2021-04-01"; // default is start of Phase 3
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2021-04-01";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2021-07-01";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2021-10-01";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2022-01-01";
          } else if (str.search("ends") >= 0) {
            date = "2022-04-01";
          }
        } else if (opt == 1) {
          date = "2022-03-31"; // default is end of Phase 3
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2021-06-30";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2021-09-30";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2021-12-31";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2022-03-31";
          } else if (str.search("ends") >= 0) {
            date = "2022-05-31";
          }
        }
      } else if (str.search("phase 4") >= 0) {
        // Phase 4 (Operations): April 2022 - March 2023
        if (opt == 0) {
          date = "2022-04-01"; // default is start of Phase 4
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2022-04-01";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2022-07-01";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2022-10-01";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2023-01-01";
          } else if (str.search("ends") >= 0) {
            date = "2023-04-01";
          }
        } else if (opt == 1) {
          date = "2023-03-31"; // default is end of Phase 4
          if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
            date = "2022-06-30";
          } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
            date = "2022-09-30";
          } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2022-12-31";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2023-03-31";
          } else if (str.search("ends") >= 0) {
            date = "2023-05-31";
          }
        }
      } else if (str.search("phase 1") >= 0) {
        // Phase 1 (Planning): Oct 2019-Mar 2020, two quarters
        if (opt == 0) {
          date = "2019-10-01"; // default is start of Phase 1
          if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2019-10-01";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2020-01-01";
          }
        } else if (opt == 1) {
          date = "2020-03-31"; // default is end of Phase 1
          if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
            date = "2020-12-31";
          } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
            date = "2020-03-31";
          }
        }
      }
    }
  } else {
    // assign date based on title
    str = title.trim().toLowerCase();
    str = str.split(" ")[0]; //get first "word" in the title
    // Operations Phase 1 tickets (e.g., 1a1, 1a2, etc.)
    let patt = /^1[a-z]/; //starts with digit-letter
    if (patt.test(str)) {
      if (opt == 0) {
        date = "2019-10-01";
      } else if (opt == 1) {
        date = "2020-03-31";
      }
    }
    // Specific Operations Phase 2 tickets (e.g., 2a1, 2b1, etc.)
    patt = /^2[a-z]\d/; //starts with 2-letter-digit
    if (patt.test(str)) {
      if (str.search("2a1:") >= 0) { //2a1 is due Phase 2 - Quarter 1
        if (opt == 0) {
          date = "2021-01-01";
        } else if (opt == 1) {
          date = "2021-03-31";
        }
      } else if (str.search("2b1a") >= 0) { //2b1a is due Phase 2 - Quarter 2
        if (opt == 0) {
          date = "2020-04-01";
        } else if (opt == 1) {
          date = "2020-06-30";
        }
      } else if (str.search("2b1b") >= 0) { //2b1b is due Phase 2 - Quarter 2
        if (opt == 0) {
          date = "2020-04-01";
        } else if (opt == 1) {
          date = "2020-06-30";
        }
      } else if (str.search("2b1d") >= 0) { //2b1d is due Phase 2 - Quarter 4
        if (opt == 0) {
          date = "2020-10-01";
        } else if (opt == 1) {
          date = "2020-12-31";
        }
      } else if (str.search("2b1e") >= 0) { //2b1e is due Phase 3 - Quarter 4
        if (opt == 0) {
          date = "2021-10-01";
        } else if (opt == 1) {
          date = "2021-12-31";
        }
      } else if (str.search("2b1f") >= 0) { //2b1f is due Phase 3 - Quarter 1
        if (opt == 0) {
          date = "2022-01-01";
        } else if (opt == 1) {
          date = "2022-03-31";
        }
      } else if (str.search("2b1g") >= 0) { //2b1g is due Phase 3 - Quarter 4
        if (opt == 0) {
          date = "2021-10-01";
        } else if (opt == 1) {
          date = "2021-12-31";
        }
      }
    }
    // Specific Deliverables
    patt = /^del.e\d/; //starts with "Del.E followed by a number"
    if (patt.test(str)) {
      if (str.search("del.e2b") >= 0) {
        if (opt == 0) {
          date = "2019-10-01";
        } else if (opt == 1) {
          date = "2020-03-31";
        }
      }
    }
  }
  return date;
}

//Calculates the task completion percentage
function getGanttProgress(bodyText, status) {
  let progress = 0;
  let checked = 0;
  let unchecked = 0;
  let total = 0;
  if (status.search("closed") >= 0) {
    progress = 100;
  } else if (status.search("open") >= 0) {
    //count number of open check boxes
    let patt = /-\s\[\s\]/g;
    if (patt.test(bodyText)) {
      unchecked = bodyText.match(patt).length;
    }
    //count number of closed check boxes
    patt = /-\s\[x\]/g;
    if (patt.test(bodyText)) {
      checked = bodyText.match(patt).length;
    }
    // calculate percent complete
    total = checked + unchecked;
    if (total > 0) {
      progress = Math.round((checked / total) * 100);
    }
  }
  return progress;
}

//Gets any task dependencies from the GitHub issue
//body. Dependencies should be included in the body
//text using the hash symbol followed by the issue
//number (e.g., #19, #8)
function getGanttDependencies(bodyText, repoName) {
  let dependencies = "";
  //check if body text contains reference to another issue
  // (e.g., #19)
  let patt = /#\d+/g;
  if (patt.test(bodyText)) {
    let result = bodyText.match(patt);
    result.forEach(function(value, index) {
      // Note that the syntax of the issue names is:
      // [repo name] + " Issue # " + [GitHub issue number]
      dependencies = dependencies + repoName + " Issue " + value;
      if (index < result.length - 1) {
        dependencies = dependencies + ", ";
      }
    });
  }
  return dependencies;
}

//sort tasks
function sortTasks(alltasks) {
  let sortedTasks = [];

  // separate out operations tasks
  let opsTasks = [];

  //get list of which repos to show
  let activeRepos = whichRepos();

  //flag to show/hide completed tasks
  let showComplete = getShowComplete();

  alltasks.forEach(function(task) {
    item = [];
    item.id = task.id;
    item.name = task.name;
    item.start = task.start;
    item.end = task.end;
    // disable dependencies -- too complicated
    // item.dependencies = alltasks[i].dependencies;
    item.progress = task.progress;
    //the GitHub issue URL to link to in the pop-up
    item.url = task.url;
    //set the color code for the progress bar
    item.custom_class = task.repo;
    //sets the group ID
    let group = task.group_id;
    item.group_id = group;

    //first, filter out undated tasks
    if (item.start != "") {
      //next, filter by completion status, if needed
      if (((!showComplete) && (item.progress < 100)) || (showComplete)) {
        //separate out operations tasks to display at bottom
        if (group == "operations") {
          opsTasks.push(item);
        } else if (activeRepos.includes(group)) {
          // finally, push to task list if all other criteria are met
          sortedTasks.push(item);
        }
      }
    }

  });

  //sort tasks by start date
  sortedTasks.sort((a, b) => (a.start > b.start) ? 1 : -1);

  // add operations tasks at bottom, if user has chosen to display
  if (activeRepos.includes("operations")) {
    //sort operations tasks by date
    opsTasks.sort((a, b) => (a.start > b.start) ? 1 : -1);
    //add operations tasks to end of task list
    opsTasks.forEach(function(task) {
      sortedTasks.push(task);
    });
  }

  return sortedTasks;
}


//Write all GitHub issues in all repos to a TSV file.
function writeGanttDataFile() {
  // content for TSV file
  let tsvContent =
      "id\ttitle\tstart_date\tend_date\tprogress\tdependencies\turl\n";

  //check how many issues are in each repo. Max is 100 per "page" of results.
  //send each call to each repo asynchronously and wait for them all to finish
  let issuePromises = [];
  allRepos.forEach(function(repo) {
    let p = new Promise(function(resolve, reject){
      checkRepoPagination(repo, resolve, reject);
    });
    issuePromises.push(p);
  });
  //wait till all async calls have finihsed to continue getting data
  Promise.all(issuePromises).then(function() {
    let alltasks = [];

    //send each call to each repo asynchronously and
    // wait for them all to finish
    let dataPromises = [];
    allRepos.forEach(function(repo) {
      //check which repo to get and how many pages of results
      let npages = repo.data_pages;
      for (let i = 0; i < npages; i++) {
        let p = new Promise(function(resolve, reject){
          getRequest(repo.name, npages, alltasks, resolve, reject);
        });
        dataPromises.push(p);
      }
    });
    Promise.all(dataPromises).then(function() {
      let tsvRow = "";
      alltasks.forEach(function(task) {
        // check if issue is a pull request or issue;
        // if pull request, then ignore
        if (isGHIssue(task.url)) {
          // task ID
          tsvRow = "\"" + task.id + "\"";
          // task title
          tsvRow += "\t\"" + task.name +"\"";
          //start date
          tsvRow += "\t\"" + task.start +"\"";
          //end date
          tsvRow += "\t\"" + task.end +"\"";
          // Progress completed
          tsvRow += "\t" + task.progress;
          // dependencies
          tsvRow += "\t\"" + task.dependencies +"\"";
          // task url
          tsvRow += "\t" + task.url + "\n";
        }
        tsvContent += tsvRow;
      });
      // write to file
      window.location.href = "data:text/tab-separated-values,"
        + encodeURIComponent(tsvContent);
      return;
    });
  });
};

/* The GitHub API only returns up to 100 results per request.
This function checks the number of issues in each repo. */
function checkRepoPagination(repo, resolve, reject) {
  let url = repoBaseURL + repo.name + "/issues?state=all&per_page=1&page=0";
  let xhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
  // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(xhttp.responseText);
    // number of GH issues will be in first item
    let n = parseInt(data[0].number);
    if (n > 100) {
      repo.data_pages = Math.ceil(n/100);
    }
    return resolve();
  }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


// Sends the GitHub API request for a particular repo,
// parses the response, and creates a gantt chart object
// to display the information.
// TO DO: add custom formatting of bars based on repo; see
// https://github.com/frappe/gantt/issues/175 for implementation.
// NOTE: If a repo has more than 100 issues, will need to get multiple
// "pages" of data.
function getRequest(repo, npages, alltasks, resolve, reject) {
  //gets all issues, up to 100
  let url = repoBaseURL + repo +
      "/issues?state=all&per_page=100&page=" + npages;
  let xhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhttp.responseText);
      // Create a gantt chart task for each issue in the repo.
      // Syntax: https://frappe.io/gantt
      data.forEach(function(issue) {
        // check if issue is a pull request or issue;
        // if pull requeent, then ignore
        if (isGHIssue(issue.html_url)) {
          let item = [
          {
             "id": getGanttID(repo, issue.number),
             "name": issue.title,
             "start": getGanttDate(issue.milestone, 0, issue.title),
             "end": getGanttDate(issue.milestone, 1, issue.title),
             "progress": getGanttProgress(issue.body, issue.state),
             "dependencies": getGanttDependencies(issue.body,repo),
             //get the GitHub issue URL so we can link to it in the pop-up
             "url": issue.html_url,
             //group name
             "group_id": repo,
             //repo name
             "repo": repo,
          }];
          alltasks.push(item[0]);
        }
      });

    return resolve();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/* Gets list of repos to view in Gantt chart */
/* and returns array of GH repo names */
function whichRepos(){
  let activeRepos = [];
  let activeButtons = $(".view.active").toArray();
  activeButtons.forEach(function(button) {
    let str = button.innerHTML;
    if (str == "Community Development") {
      activeRepos.push("community-development");
    } else if (str == "Data Model Harmonization") {
      activeRepos.push("data-model-harmonization");
    } else if (str == "Terminology") {
      activeRepos.push("Terminology");
    } else if (str == "Tools") {
      activeRepos.push("tools");
    } else if (str == "Operations") {
      activeRepos.push("operations");
    }
  });
  return activeRepos;
}

function getShowComplete(){
  let showAll = true;
  let txt = $(".btnHideComplete").text();
  if (txt == "Show Completed Tasks") {
    showAll = false;
  }
  return showAll;
}

function createTasks() {

  //get list of selected repos
  let repos = whichRepos();

  //check how many issues are in each repo.
  // Max is 100 per "page" of results.
  // send each call to each repo asynchronously
  // and wait for them all to finish
  let issuePromises = [];
  allRepos.forEach(function(repo) {
    let p = new Promise(function(resolve, reject){
      checkRepoPagination(repo, resolve, reject);
    });
    issuePromises.push(p);
  });

  //wait till all async calls have finihsed to continue getting data
  Promise.all(issuePromises).then(function() {
    let alltasks = [];

    //send each call to each repo asynchronously and
    // wait for them all to finish
    let dataPromises = [];
    allRepos.forEach(function(repo) {
      //check which repo to get and how many pages of results
      let npages = repo.data_pages;
      for (let i = 0; i < npages; i++) {
        let p = new Promise(function(resolve, reject){
          getRequest(repo.name, npages, alltasks, resolve, reject);
        });
        dataPromises.push(p);
      }
    });
    Promise.all(dataPromises).then(function() {
      let tasks = sortTasks(alltasks);

      let gantt = new Gantt(".gantt-target", tasks, {
        //turn off editing
        draggable: false,
        hasArrows: false,
        //create custom groupings
        groups: [
          {
            id: "operations",
            name: "Operations",
            bar_class: "bar-ops"
          },
          {
            id: "community-development",
            name: "Community Development Workstream",
            bar_class: "bar-cd"
          },
          {
            id: "data-model-harmonization",
            name: "Data Model Harmonization Workstream",
            bar_class: "bar-dmh"
          },
          {
            id: "Terminology",
            name: "Ontology and Terminology Ecosystem Workstream",
            bar_class: "bar-term"
          },
          {
            id: "tools",
            name: "Tools and Data Quality Workstream",
            bar_class: "bar-tools"
          }
        ],

        //create a custom pop-up with the task group name, URL, title and dates
        custom_popup_html: function(task) {
          return `
          <div class="details-container">
            <div class="popup_head">${task._group.name}</div>
            <div class="title" style="border-bottom: 1px solid #a3a3ff;">
              ${task.name}
            </div>
            <div class="subtitle">
              Due: ${task.end} &nbsp;&nbsp;&nbsp;&nbsp;
              ${task.progress}% Complete<br />
              <a href=${task.url} target="_blank">${task.url}</a>
            </div>
          </div>
          `;
        }
      });

      // deletes extra blank space at bottom of chart
      let new_height = gantt.$svg.getAttribute("height") - 100;
      gantt.$svg.setAttribute("height", new_height);

      //sets the default view mode
      gantt.change_view_mode("Month");

      //change view mode dynamically
      $(function() {
        $(".timeline-view").on("click", "button", function() {
          $btn = $(this);
          let mode = $btn.text();
          gantt.change_view_mode(mode);
          $btn.parent().find("button").removeClass("active");
          $btn.addClass("active");
        });
      });

      //toggle workstream tasks dynamically
      $(function() {
        $(".chart-view").on("click", "button", function() {
          $btn = $(this);
          let ws = $btn.text();
          $btn.toggleClass("active");
          //re-sort tasks to show/hide selected workstreams
          tasks = sortTasks(alltasks);
          gantt.refresh(tasks);
        });
      });

      // toggle incomplete tasks
      $(function() {
        $(".completed-view").on("click", "button", function() {
          //change button text
          $btn = $(this);
          let mode = $btn.text();
          if (mode == "Hide Completed Tasks") {
            $btn.text("Show Completed Tasks");
          } else {
            $btn.text("Hide Completed Tasks");
          }
          //re-sort tasks to show/hide tasks by completion status
          tasks = sortTasks(alltasks);
          gantt.refresh(tasks);
        });
      });


    });
  });
}
createTasks();
