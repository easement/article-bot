
/* *****************************************************************************

***********************************

This is a Slack bot which reccomends articles.
Built with Botkit.
Based on: https://codelabs.developers.google.com/codelabs/cloud-slack-bot/index.html#0
*/

var Botkit = require('botkit');
var fs = require('fs'); // NEW: Add this require (for loading from files).

var controller = Botkit.slackbot({debug: false});

// START: Load Slack token from file.
// Exammple: `slack_token_path=./slack-token node article-bot.js`
if (!process.env.slack_token_path) {
  console.log('Error: Specify slack_token_path in environment');
  process.exit(1);
}

fs.readFile(process.env.slack_token_path, function (err, data) {
  if (err) {
    console.log('Error: Specify token in slack_token_path file');
    process.exit(1);
  }
  data = String(data);
  data = data.replace(/\s/g, '');
  controller
    .spawn({token: data})
    .startRTM(function (err) {
      if (err) {
        throw new Error(err);
      }
    });
});
// END: Load Slack token from file.

controller.hears(
  ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) { bot.reply(message, 'Meow. :smile_cat:'); });

// Help
controller.hears(
  ['help'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) { bot.reply(message, 'Ask me for an article'); });
 
 
// Article stuff here 
var articles = [
{
  mins: 5,
  topics: ['leadership'],
  title: 'How to be an energy detective to increase your leadership effectiveness',
  url:'http://peopledevelopmentmagazine.com/2016/05/28/leadership-effectiveness/'
},
{
  mins: 5,
  topics: ['leadership'],
  title: 'The cornerstone of authentic leadership',
  url:'http://peopledevelopmentmagazine.com/2013/10/10/cornerstone-authentic-leadership'
},
{
  mins: 5,
  topics: ['leadership'],
  title: '3 Mindset shifts that will make you a better leader',
  url:'http://peopledevelopmentmagazine.com/2016/04/03/mindset-shifts-better-leader/'
},
{
  mins: 5,
  topics: ['leadership', 'growth', 'goals'],
  title: 'This is Why You Need to Let Your Best Employees Go',
  url:'https://www.entrepreneur.com/article/276800'
},
{
  mins: 5,
  topics: ['leadership', 'trust'],
  title: 'The 4 Dimensions of Trust',
  url:'http://seapointcenter.com/dimensions-of-trust/'
},
{
  mins: 5,
  topics: ['leadership', 'influence', 'capacity'],
  title: 'Stop Trying to Grow Influence. Grow this Instead.',
  url:'https://leadchangegroup.com/stop-trying-to-grow-influence-grow-this-instead/'
},
{
  mins: 5,
  topics: ['leadership','hiring','phone screen'],
  title: 'The Five Essential Phone-Screen Questions',
  url:'https://sites.google.com/site/steveyegge2/five-essential-phone-screen-questions'
},
{
  mins: 5,
  topics: ['leadership','burnout'],
  title: 'How to Avoid Burnout: Marissa Mayer',
  url:'http://www.bloomberg.com/news/articles/2012-04-12/how-to-avoid-burnout-marissa-mayer'
},
{
  mins: 5,
  topics: ['leadership', 'growth'],
  title: '\'Give Away Your Legos\' and Other Commandments for Scaling Startups',
  url:'http://firstround.com/review/give-away-your-legos-and-other-commandments-for-scaling-startups/'
},
{
  mins: 7,
  topics: ['leadership','meetings'],
  title: 'Use These 4 Question Types To Facilitate More Effective Meetings',
  url:'https://www.15five.com/blog/use-4-question-types-facilitate-effective-meetings'
},
{
  mins: 5,
  topics: ['leadership', 'compormise'],
  title: 'Two Words That Kill Your Relationship With Employees',
  url:'https://www.entrepreneur.com/article/248522'
},
{
  mins: 7,
  topics: ['leadership','empathy'],
  title: 'Can you teach people to have empathy?',
  url:'http://www.bbc.com/news/magazine-33287727'
},
{
  mins: 4,
  topics: ['leadership'],
  title: 'Why you should argue with your employees',
  url:'https://m.signalvnoise.com/why-you-should-argue-with-your-employees-ab8189fcd1c4#.debyvl690'
},
{
  mins: 5,
  topics: ['leadership','manage up', 'communication'],
  title: 'How to Manage Up Well',
  url:'https://shift.newco.co/how-to-manage-up-well-6f21236c3deb#.j7a0so9wz'
},
{
  mins: 4,
  topics: ['leadership','team','manage'],
  title: 'How To Manage Your Team Like a (Good) Boss',
  url:'https://shift.newco.co/how-to-manage-your-team-like-a-good-boss-f7930fbe3327#.9eb3tarkk'
},
{
  mins: 9,
  topics: ['leadership','growth','promotion'],
  title: 'Employee Development: How to grow your employees when you can\'t promote them',
  url:'https://getlighthouse.com/blog/employee-development-grow-cant-promote'
},
{
  mins: 5,
  topics: ['leadership', 'performance', 'engagement'],
  title: 'How to Turn around a Disengaged or Underperforming Employee',
  url:'https://getlighthouse.com/blog/turn-around-disengaged-underperforming-employee/'
},
{
  mins: 4,
  topics: ['leadership','introvert'],
  title: 'Shut Up and Listen and Other Lessons on How to Manage Introverts',
  url:'https://shift.newco.co/shut-up-and-listen-and-other-lessons-on-how-to-manage-introverts-c67e2f3ae66a#.dk72xb9cb'
},
{
  mins: 15,
  topics: ['leadership','managment','curiosity'],
  title: 'The most important, yet overlooked management skill',
  url:'https://getlighthouse.com/blog/management-skill'
},
{
  mins: 4,
  topics: ['leadership','teams'],
  title: '40 Ways to Invest in More Resilient Teams',
  url:'https://hackernoon.com/40-ways-to-invest-in-more-resilient-teams-c2ac7d008591'
},
{
  mins: 13,
  topics: ['leadership','team','psychological safety'],
  title: 'Engineering a culture of psychological safety',
  url:'https://blog.intercom.com/psychological-safety/'
},
{
  mins: 13,
  topics: ['leadership','team','psychological safety'],
  title: 'Engineering a culture of psychological safety',
  url:'https://blog.intercom.com/psychological-safety/'
},
{
  mins: 13,
  topics: ['leadership','team','psychological safety'],
  title: 'Engineering a culture of psychological safety',
  url:'https://blog.intercom.com/psychological-safety/'
},
{
  mins: 5,
  topics: ['persuasion'],
  title: 'How to Convince Anyone of Anything',
  url:'https://medium.com/@asharfin/how-to-convince-anyone-of-anything-4775de0e51a1#.d47dyelsa'
},
{
  mins: 4,
  topics: ['persuasion'],
  title: 'The Hidden Agenda of Powerless Speech: A Tip for Better Persuasion',
  url:'https://shift.newco.co/the-hidden-agenda-of-powerless-speech-a-tip-for-better-persuasion-c5dff3f0f7ae#.aqwwkkzd8 powerful vs powerlesws speech patterns.'
},
{
  mins: 3,
  topics: ['hiring', 'growth'],
  title: 'The Person They\'ll Become',
  url:'https://m.signalvnoise.com/the-person-they-ll-become-ad9ae271b4ad#.sta71d98m'
},
{
  mins: 2,
  topics: ['hiring'],
  title: 'Hire good writers',
  url:'https://gettingreal.37signals.com/ch08_Wordsmiths.php'
},
{
  mins: 5,
  topics: ['hiring'],
  title: 'How to hire a programmer when you\'re not a programmer',
  url:'https://signalvnoise.com/posts/2628-how-to-hire-a-programmer-when-youre-not-a-programmer'
},
{
  mins: 5,
  topics: ['hiring', 'interview'],
  title: 'The Terrible Technical Interview',
  url:'http://techcrunch.com/2015/03/21/the-terrible-technical-interview/'
},
{
  mins: 5,
  topics: ['hiring', 'interview'],
  title: 'Quit Complaining About a Talent Shortage and Interview Better',
  url:'https://www.schneems.com/post/17210344832/quit-complaining-about-a-talent-shortage-and-interview'
},
{
  mins: 5,
  topics: ['hiring', 'interview'],
  title: 'Hire a Top Performer Every Time with These Interview Questions',
  url:'http://firstround.com/review/hire-a-top-performer-every-time-with-these-interview-questions/'
},
{
  mins: 5,
  topics: ['hiring', 'emotional intelligence'],
  title: 'How to Assess Emotional Intelligence During the Interview Process',
  url:'https://thinkgrowth.org/how-to-assess-emotional-intelligence-during-the-interview-process-bad335d06f5e'
},
{
  mins: 5,
  topics: ['leadership'],
  title: 'The Conjoined Triangles of Senior-Level Development',
  url:'http://frontside.io/blog/2016/07/07/the-conjoined-triangles-of-senior-level-development.html'
},
{
  mins: 5,
  topics: ['pressure', 'stress'],
  title: 'Pressure Doesn\'t Have to Turn into Stress',
  url:'https://hbr.org/2017/03/pressure-doesnt-have-to-turn-into-stress'
},
{
  mins: 8,
  topics: ['coaching'],
  title: 'You Can\'t Be a Great Manager If You\'re Not a Good Coach',
  url:'https://hbr.org/2014/07/you-cant-be-a-great-manager-if-youre-not-a-good-coach'
},
{
  mins: 5,
  topics: ['coaching'],
  title: '5 Coaching Skills That Every Manager Needs to Have',
  url:'http://www.eremedia.com/tlnt/5-coaching-skills-that-every-manager-needs-to-have'
},
{
  mins: 5,
  topics: ['coaching'],
  title: 'Know When to Manage and When to Coach',
  url:'http://www.forbes.com/sites/work-in-progress/2012/05/01/know-when-to-manage-and-when-to-coach/#aecfc9c7d04d'
},
{
  mins: 2,
  topics: ['coaching'],
  title: 'Good Engineer, Bad Engineer',
  url:'https://hackernoon.com/good-engineer-bad-engineer-c6e2dea98b9b'
},
{
  mins: 5,
  topics: ['coaching'],
  title: 'How to be an effective early stage employee. Hint: be helpful.',
  url:'https://be.helpful.com/how-to-be-an-effective-early-stage-employee-hint-be-helpful-e681b456a01f'
},
{
  mins: 4,
  topics: ['management tips'],
  title: 'Line management 101 — Getting the basics right',
  url:'https://shift.newco.co/line-management-101-getting-the-basics-right-cb66d8a7e595#.pfroodkux'
},
{
  mins: 9,
  topics: ['management tips'],
  title: 'How to ask good questions',
  url:'https://jvns.ca/blog/good-questions/'
},
{
  mins: 8,
  topics: ['management tips'],
  title: 'Resilience Is About How You Recharge, Not How You Endure',
  url:'https://hbr.org/2016/06/resilience-is-about-how-you-recharge-not-how-you-endure'
},
{
  mins: 7,
  topics: ['management tips'],
  title: 'Bill Gates, Warren Buffett, and Oprah Winfrey All Use the 5-Hour Rule',
  url:'https://www.inc.com/empact/bill-gates-warren-buffett-and-oprah-all-use-the-5-hour-rule.html'
},
{
  mins: 5,
  topics: ['management tips', 'managing up'],
  title: 'How to give feedback to your boss',
  url:'https://blog.knowyourcompany.com/how-to-give-feedback-to-your-boss-f0871117c835'
},
{
  mins: 8,
  topics: ['management tips'],
  title: 'Etsy Lessons',
  url:'http://larahogan.me/blog/etsy-lessons/'
},
{
  mins: 3,
  topics: ['management tips'],
  title: 'The Boss You Don\'t Want to Be',
  url:'https://m.signalvnoise.com/the-boss-you-dont-want-to-be-3fdfe6c4e8dd'
},
{
  mins: 5,
  topics: ['management tips'],
  title: 'The 3 Questions Every Manager Struggles with Making Career Development Plans',
  url:'https://getlighthouse.com/blog/career-development-plans-manager-struggles'
},
{
  mins: 01,
  topics: ['management tips'],
  title: 'Introductory bullshit detection for non-technical managers',
  url:'https://itsyourturnblog.com/introductory-bullshit-detection-for-non-technical-managers-7c7a9e54afee'
},
{
  mins: 6,
  topics: ['management tips', 'growth'],
  title: 'How Do Managers* Get Stuck?',
  url:'https://medium.com/@skamille/how-do-managers-get-stuck-b6ec9ecd1da1'
},
{
  mins: 15,
  topics: ['management tips'],
  title: 'How Much To Manage (Management Energy Units)',
  url:'https://medium.learningbyshipping.com/how-much-to-manage-management-energy-units-ca1637a05140'
},
{
  mins: 15,
  topics: ['management tips'],
  title: 'These 13 Exercises Will Prepare You for Work\'s Toughest Situations',
  url:'http://firstround.com/review/these-13-exercises-will-prepare-you-for-works-toughest-situations/'
}
];


// UTILS ----------------------------------------
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
};

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

// remove Duplicates
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
// /UTILS ----------------------------------------
  

// PREP ARTICLES ---------------------------------
// Pluck and flatten topics
var topics = flatten(articles.map(function(o) { return o.topics; })).filter(onlyUnique);
var showTopics = function(){
  return "Choose a topic: \r\n" + topics.sort().join("\r\n") + "\r\n*random*";
};

// Iterate and choose by topic
function filterArticlesByTopic(articles, topic) {
  var filtered = [];
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].topics.includes(topic)) {
        filtered.push(articles[i]);
    }
  }
  return filtered;
}

// Iterate and choose by time
function filterArticlesByTime(articles, time) {
  var filtered = [];
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].mins <= time) {
        filtered.push(articles[i]);
    }
  }
  return filtered;
}

var topic = '';
var time = 999; 
function filterArticles(articles) {
  var filtered = articles;
  if (topic.length > 0)
    filtered = filterArticlesByTopic(filtered, topic);
  if (time < 999)
    filtered = filterArticlesByTime(filtered, time);
  
  return filtered;
}

function displayArticle(filtered) {
  var numArticles = parseInt(filtered.length, 10);
  if (numArticles > 0) {
  	var article = filtered.random();
    return {
      'text': 'Here\'s a ~' + article.mins + ' minute read entitled: ',
      'attachments': [
        {
          'fallback': article.url,
          'text': '<' + article.url +
            '|'+ article.title +'>!'
        }
      ]
    };
  }
  return {'text': 'No articles meet your criteria'};
}
// PREP ARTICLES ---------------------------------


  
// START: listen for articles
controller.hears(
  ['article','articles','read'],
  ['ambient', 'direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      if (err) {
        console.log(err);
        return
      }
      convo.ask('Are you ready to read? Say YES or NO.', [
        {
          pattern: bot.utterances.yes,
          callback: function (response, convo) {
            convo.say('Great!');
            convo.ask(showTopics(), [
              {
                pattern: '[0-9,a-z ]+',
                callback: function (response, convo) {
                  topic = response.text;
                  var candidates = articles;
                  if (topic !== 'random') {
                  	candidates = filterArticles(articles);
                  }
                  // console.log(candidates);
                  convo.say(displayArticle(candidates));
                  convo.say('I hope you like it. Say article if you want another');
                  convo.next();
                }
              },
              {
                default: true,
                callback: function (response, convo) {
                  convo.say(
                    "Sorry, I didn't understand that. Enter a topic, please.");
                  convo.repeat();
                  convo.next();
                }
              }
            ]);
            convo.next();
          }
        },
        {
          pattern: bot.utterances.no,
          callback: function (response, convo) {
            convo.say('Perhaps later.');
            convo.next();
          }
        },
        {
          default: true,
          callback: function (response, convo) {
            // Repeat the question.
            convo.repeat();
            convo.next();
          }
        }
      ]);
    });
  });
