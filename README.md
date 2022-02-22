<div id="top"></div>


<!-- PROJECT LOGO -->
<h3 align="center">Role Bot for Discord!</h3>

  <p align="center">
    Role Bot for Discord is a bot, that you can use to create automatic role systems for your server, based on reactions with custom emojis.
  </p>
</div>



<!-- USAGE EXAMPLES -->
## Usage

Has few commands built in, currently localized in Finnish. 

1. `/luo-viesti` with 9 arguments. 
    * Channel
        * the channel you want to create the message to
    * One to four Role-Emoji pairs
        * Used by the bot to designate an emoji to a role. 
        * At the moment, you can have four of these per message. 
        * Each emoji must be a custom emoji, and **must be used by only once!**
2. `/admin` with one argument
    * @username
        * The user who you wish to have access to the bot
3. `/poista-rooli-kayttajilta` with one argument
    * @role
        * The role, you wish to remove from every user of the server
        * Known issue is that if the server has over 1000 users, it will only work on the first 1000. 
4. `/tyhjenna-botti`
    * No arguments
        * Wipes all the data used by the bot. Can be only used by the user-id determined in the code. 

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Teemu - [@temeasd](https://twitter.com/temeasd)

Project Link: [https://github.com/TemeASD/rolebot](https://github.com/TemeASD/rolebot)