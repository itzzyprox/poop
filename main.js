// --  Formule pour déclarer les variables
const
      config = require("./config.json"),
      { readdirSync } = require("fs"),
      { Client, Collection} = require("discord.js"),
      client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
      figlet = require('figlet'),
      colors = require('colors'),
      readline = require('readline');
client.commands = new Collection()
const exp = require('./exp.json')
console.clear()
console.log(`                                                                                                                     
  
           _|                       
                                         `.red + ` Bienvenue sur la version `.white + `${config.bot.version}`.green + ` du ` + `Iroo tool`.blue + `                       
                                   ___________________________________________________`.red)

const loadEvents = (dir = "./modules/") => {
  readdirSync(dir).forEach(dirs => {
  const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
                                  
  for (const event of events) {
  const evt = require(`${dir}/${dirs}/${event}`);
  const evtName = event.split(".")[0];
  client.on(evtName, evt.bind(null, client));
  console.log(`[EVENTS]`.yellow + ` Chargement de l'évènement >`.white + ` ${evtName}.js`.yellow);
  };
});
};
loadEvents()

const loadCommands = (dir = "./commandes/") => {
  readdirSync(dir).forEach(dirs => {
  const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
      
  for (const file of commands) {
  const getFileName = require(`${dir}/${dirs}/${file}`);
  client.commands.set(getFileName.help.name, getFileName);
  console.log(`[COMMANDS]`.green + ` Chargement de la commande >`.white + ` ${getFileName.help.name}.js`.green);
  };
});
};
loadCommands()


client.on('ready', () => {
  const statuses = [
      () => `${client.guilds.cache.size} serveurs`,
      () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
  ]
  let i = 0
  setInterval(() => {
      client.user.setActivity(statuses[i](), {type: 'PLAYING'});
      i = ++i % statuses.length
  }, 1e4);
});







const fs = require("fs")
client.on('message', message => {
    
  let addExp = Math.floor(Math.random() * 5) + 1;

  if (!exp[message.author.id]) {
      exp[message.author.id] = {
          exp: 0,
          niveau: 1
      };
  }

  let currentExp = exp[message.author.id].exp;
  let currentNiv = exp[message.author.id].niveau;
  let nextLevel = currentNiv * 100;
  exp[message.author.id].exp = currentExp + addExp;

  if(nextLevel <= currentExp) {
      exp[message.author.id].niveau +=1;
      message.channel.send(`**GG**, <@`+message.author.id+`> amélioré aux niveaux \`${currentNiv + 1}\``).then(msg => {
      });
  }
  fs.writeFile('./exp.json', JSON.stringify(exp), err =>{
      if (err) console.log(err);
  });
});


//ANTILINKS
client.on("message", (message) => {
  if(message.member.hasPermission("ADMINISTRATOR", "MANAGE_SERVERS")) return 
  if (message.member.roles.cache.some(role => role.name === 'PUB')) return


   if (message.content.includes("discord.gg/")) {
    message.channel.bulkDelete(1);
    message.channel.send("Pas de liens ici, " + "<@"+message.member+">")
  }
  if (message.content.includes("zyprox est moche")) {
    message.channel.bulkDelete(1);
    message.channel.send("Prochaine fois t'est ban !, " + "<@"+message.member+">")
  }
  if (message.content.includes("Zyprox est moche")) {
    message.channel.bulkDelete(1);
    message.channel.send("Prochaine fois t'est ban !, " + "<@"+message.member+">")
  }

  client.on('message', message => {
    if (message.content === "!unban") {
      return message.reply("Vous n'avez pas spécifié de membres")
    }
    if (message.content === "!ub") {
      return message.reply("Vous n'avez pas spécifié de membres")
    }
    if (message.content === "!pardon") {
      return message.reply("Vous n'avez pas spécifié de membres")
    }
  })



  
});

client.login(config.login.token).catch(e => { console.log(`[CRITICAL ERROR]`.red + ` Erreur rencontrée: ${e}`) });