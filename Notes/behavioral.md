# Behavioral

---

## Experienced setbacks or failure
ZnO synthesis and optimization
S. Too many synthetic options making it expensive to find a working prep. Multiple groups work different angles.
T. Find a new stradegy to avoid the expensive brute force stradegy. Provide progress updates to inform grant writers for upcoming renewal.
A. I took a step back and considered the historic progress and what we still needed to do. We need a totally different approach. I advocated for a two-pronged stradegy: 
-statisitcal: study of the best prep so far in which many single particles are measured repeatedly to obtain a quantitative summary of the material.
-ML: study all published materials to identify a new prep route. The data was small. (regeression algorithms that usual work for small datasets with interacting features: decision tree, random forest, k-NN, bagging.)
R. Two-fold:
-statistic: We obtained preliminary results, but it is very slow and still and we are "cherry-picking" particles. 
-ML: Modeling did not converge on a working solution. Validation repeatedly failed which we think was due to the small sample size. 
The statistical aproach was only partly successful and the ML approach failed, but we were at least able to provide enough information to the grant team for renewal. Indeed we were renewed for antoher 5 year cycle at 20 million. 

## Did not have enough time to meet a deadline
ZnO synthesis and optimization
S. Too many synthetic options making it expensive to find a working prep. Multiple groups work different angles.
T. Find a new stradegy to avoid the expensive brute force stradegy. Provide progress updates to inform grant writers for upcoming renewal.
A. I took a step back and considered the historic progress and what we still needed to do. We need a totally different approach. I advocated for a two-pronged stradegy: 
-statisitcal: study of the best prep so far in which many single particles are measured repeatedly to obtain a quantitative summary of the material.
-ML: study all published materials to identify a new prep route. The data was small. (regeression algorithms that usual work for small datasets with interacting features: decision tree, random forest, k-NN, bagging.)
R. Two-fold:
-statistic: We obtained preliminary results, but it is very slow and still and we are "cherry-picking" particles. 
-ML: Modeling did not converge on a working solution. Validation repeatedly failed which we think was due to the small sample size. 
The statistical aproach was only partly successful and the ML approach failed, but we were at least able to provide enough information to the grant team for renewal. Indeed we were renewed for antoher 5 year cycle at 20 million. 

## Manage multiple projects with different goals
Final projects + Thesis
S. I was working on multiple projects while nearing my PhD Defense half a year away. Research of a new material, a big team collaboration on a long-term work, writing my thesis, mentoring a undergraduate, and starting a new project. 
T. I need to balance these projects. Most importantly, prepare for my Defense and get my main project to publication ready. Even though my graduation did not dependend on the other projects, I wanted to ensure they are in good hands for the sake of the team as a whole.
A. I always keep a live timeline.
1. For each project, consider what deadlines exits.
2. Consider my vision for the project I own and my Defense prep.
3. Make a written timeline with end goals and subgoals, while consider how long each portion will take.
4. After all of this, decide what is realistic. I decided I don't have time to complete the new project, so I prioritized handing it off to a trusted coworker. I selected them personally becasuse this project was challening and required someone skilled. Then, I perfomed experiments with them to mentor them, prepare them for the project, and build trust. Each week, I would update my timeline as needed and shift my priorities to stay on task. Nearing my Defense, the collaborative project did not seem likely to conlcude, so I prepared detailed documentation so others can replicate my work after I leave.
R. I finished my thesis 3 weeks in advance, allowing plenty of time for practice and clearing up other admin responsibilities. My main publication was submitted before my Defense. It since published in Spring. The new project was handed off successfully and he is now working on it independently.

## Use data to make project desisions
Data pipeline EDA
S. Our lab relies heavily on brute force data workup from multiple instruments for a variety of different experiments. We often spend hours in the middle of an experiment working up data to make decisions. Sometimes this takes too long, so we end up making a rash call without fully understanding the data. Although I could accept this workflow as many did before me, I wanted high standards.
T. I wanted to improve the data analytics pipeline by tranforming the current system to both improve experiment efficiency, reducing costs, and also imporve the decision making process using more data to improve results. This should also serve to simplify the current software stack by consolidating everything into a more unviersal Python-based system. 
A. I worked with other users to make a list of all experiments, instruments, and data types relevant to the system in question. I also checked with everyone to make sure they would be happy with the switch to a new system. I outliined the framework in collaboration with a software tech first: python libraries for communication with the inputs (GPIB, USB), data storage using Postgres, and automatic analysis in Python. The simple UI enables selecting for the experiment type for data base information and automatic EDA. The EDA includes quick checks for parameters like SNR, baseline drift, anomaly detection, and outliers. 
R. I discussed the new process with users and everyone agreed that the new system is faster and more intuitive. On average users reported that they finished routine experiments ~50% faster, making more time for their specialized experiments. Also, the data base serves as a baseline standard for "good" data, ensuring high standards in the future.

## Go outside your comfort zone or develop skills in a new area
Lab reservations
Context for first time it comes up: We gained new instrumentation for a high use instrument table, so it was often getting booked over a month or more in advance, which makes quick turnaround on urgent projects impossible. It was also causing frustration among users and competition to collect more bookings. This snowballed, and at one point the table was booked 3 months out. I decided that although the demand has increased a lot due to new capabilities, this backlog is excessive. I intuitively already suspected it was due to a lack of oversight and rules and also that we were not utilizing the table efficiently. By improving utilization and improving policies, we can boost data output without increase the cost at all.
S. I performed data modeling to support several changes: only book when you have an experiment, plan ahead and include details in the reservation, only book 2 days per week on high-use instruments. This was working, but I knew it was fragile and could be better. I need to find a way to better monitor bookings even after I graduate.
T. I discussed with other users and found out most are very open to switching away from google calendar which is often hard to use and hard to monitor. I decided to create own instrument reservation system. Although I had no webdevelopment expererience, I knew this was the best solution in the long-run.
A. I created a working reservation system using Cursor and Claude Code. I frequenly discussed different features, the UI, and managemnt opotions with labmates along the way to ensure everyone was supportive and satisfied. It had several improvments over the google calwendar systmem like easy monitoring of bookings, better mobile support, email services for booking rules, user-specific data tracking, and easy control of booking rules and limits. 
R. I finished the app in around 2 months and everyone started using it on the same day. I chatted with other users and they all agreed its much better. I also made detailed documentation in case someone wants to make changes in the future. The lab is still using this system and when I checked recently, they only have about 2 weeks of bookings.


## Disagreement with a coworker about a project
Instrument layout
S. New research directions required changes to the instrument layout for part of our labspace to ensure efficiency. This included around 15 instruments and numerous supporting equipment for about 6 key measurement types.
T. Determine the best instrument layout for current and future needs.
A. I worked with labmates to brainstorm all the experiments we would likely perform in the future and their dependencies. There was no single best layout because each served some experiments better than others. So, users were in favor of the layout that tended to benefit their own lab work more. For example, I preferred layout A whereas a labmate preferred layout B. I can recognize both have benefits, but I knew layout A was actually superior because it better suited the much more frequent measurement types. Layout A could be tweaked slightly to accomodate, and it would take about an hour extra each time. This was a big ask for the other user because they would be subject to this hour each time they run an experiment. However, layout B was actually incompatible with a more popular measurement. I could leverage my seniority to decide without discussion, but I wanted to get the user on board with my layout, so I talked to them about their future project directions. I helped them see than they would soon be needing these capabilities and although the layout will take more time now, it will improve their data overall in the long-run. Our lab has high standards for our publications so better data is always the priority. They agreed. We also wanted to make sure the layout was objectively better using numbers. The two of us worked together to quantify the time impact of each layout on each measurement. In the end, layout A was about 25% more efficient than layout B.
R. The lab was able to unify in choosing layout A. By earning the other user's trust, they volunteered to help set up, and they gave helpful tips that benefitted everyone.


## Different workstyle from a coworker
Planner vs Go with the flow
S. Everyone has a different work style. Some are detail oriented and have specific routines. Others are more flexible and take things hour by hour by feel. I tend to prefer to plan ahead with more detail and anticipate what I want to accomplish each day. I plan to start at a certain time and finish a certain set of tasks. So, when I was working on a collaboration with a labmate who prefers to make decisions at the last minute, we sometimes had disagreements. We had to perform some highlty complex measurements as a team because we were each experts with a potion of the measurement. However, he would often arrive late on the day of our experiment or suddenly decide to break for lunch in the middle of a measurement. On the other hand, I would sometimes have to leave early for other responsibilities. All this lead to slower progress becasue we had different work styles.
T. I wanted to find a way to work with him more efficiently to improve our project speed and save resouces on the high-demand instrument. This would help our project and also save days for others to use the instrument. 
A. I sat down with him and explained my perspective on planning the workday and keeping to our scheduled commitments. I recognized that he is also highly efficient and successful in this projects, but when working as a team, we must accomodate each other to work efficiently togother. 
R. He understood pretty much right away and he actually was pleased that I came to him directly in this way. Upfront and direct. He said he feels like others in the lab treat him differently because they think he doesn't work that hard, but they never actually bring it up with him. I pointed out that he was actually doing the same thing as them: being avoidant. I suggested he confront those other labmates himself if he feels like things are awkward. I found out he ended up talking to them about, but I don't know the details. They seemed more cordial.

## Had to completely redesign a system
Data pipeline EDA
S. Our lab relies heavily on brute force data workup from multiple instruments for a variety of different experiments. We often spend hours in the middle of an experiment working up data to make decisions. Sometimes this takes too long, so we end up making a rash call without fully understanding the data. 
T. I wanted to improve the data analytics pipeline by tranforming the current system to both improve experiment efficiency, reducing costs, and also imporve the decision making process using more data to improve results. This should also serve to simplify the current software stack by consolidating everything into a more unviersal Python-based system. 
A. I worked with other users to make a list of all experiments, instruments, and data types relevant to the system in question. I also checked with everyone to make sure they would be happy with the switch to a new system. I outliined the framework in collaboration with a software tech first: python libraries for communication with the inputs (GPIB, USB), data storage using Postgres, and automatic analysis in Python. The simple UI enables selecting for the experiment type for data base information and automatic EDA. The EDA includes quick checks for parameters like SNR, baseline drift, anomaly detection, and outliers. 
R. I discussed the new process with users and everyone agreed that the new system is faster and more intuitive. On average users reported that they finished routine experiments ~50% faster, making more time for their specialized experiments. Also, the data base serves as a baseline standard for "good" data, ensuring high standards in the future.

## Motivate a team to follow your leadership on a new direction
Lab reservations
Context for first time it comes up: The addition of a Ti:S laser which I installed and a PC setup someone else installed, key instruments on a shared area are booked over a month in advance, which makes quick turnaround on urgent projects impossible. Also, it leads to frustration among labmates and competition to collect more bookings. This snowballed, and at one point the most important instrument, the PL Table, was booked for 3 months straight. I decided that although the demand has increased a lot due to new capabilities, it should be possible to meet demand by increasing capacity. I intuitively thought we were not utilizing the table efficiently. By improving utilization, we can boost data output without increase the cost at all.
S. I was discussing ways to improve insturment utilization with the lab to improve turn-around times and reduce the backlog on the Table. My guess was if we required more booking details and don't overbook, users would be more prepared and use their time more efficiently. Some gave pushback claiming they are using the instrument efficiently even without putting detail in the booking. Others worried that certain users would continue overbooking because I have no proof, making things unfair. I tried to talk to them and ensure that I would work with users to ensure they follow the new rules, but I had to accept the criticism even though I knew my perspective was likely valid.
T. To motivate the lab, I had to prove myself with data.
A. I analyzed past bookings and usage data. I  mapped the file count to data and reservation details. I model these data to analyze the relationship between booking details on file count and found a correlation. About 2% more usage per word and nearly double usage when mentioning a key light source. I quickly brought it up in a meeting and required that anyone booking include detailed notes in their reservation and only book if you actual know what experiment you are doing. We also made a weekly maximum of 2 days booked.
R. Everyone came on board after seeing the data and after a few weeks, the backlog was down to just about a month. I was still curious about one thing: was improvement a coincidence? This study was just correlation, afterall. To prove to myself and the team that we made the right call, I performed causal inference months later. I found that indeed, the utilization increased by ~50% and nearly 100% of this increase is directly caused by increased reservation detail hinging around the policy date.

## Difficult decision
Main project change
S. I had been working on a material for 2 years and haven't been able to publish due to material challenges. In my program, we usual study for about 5-6 years, so I was nearing the halfway mark without significant progress.
T. I had to decided whether to continue push on it and possible limit myself to weaker publications, or switch projects and start again. I already had two new project ideas in mind.
A. After dicussions with mentors and collegues, I decided to switch projects and risk spending a lot more time on a new project which will have its own challenges. I continued to work on the prior project a a collaboration but my focus shifted to the new one.
R. I found success with the new material and although it took another year before I could start writing my first manuscript, the the new direction was rewarding. I learned new skills that werent relevant to the prior project and multiple splitoff projects emerged. I graduated on time with two publications and the lab was transformed: now 5 memebers work with related materials.
