/**
 * CENTRAL CONFIGURATION FILE
 * All personalized romantic details, messages, dates, captions, and paths are kept here.
 * You can easily customize any text or detail from this single file.
 */

export const birthdayConfig = {
  // Personal Details
  recipient: {
    name: "Shristy",
    nickname: "Jannnnuuu",
    secretPassword: "24092026",
    wrongPasswordMessage: "Oopsieee! Wrong password, princess! Try again, my love. 🥺",
  },

  // Audio Configuration
  music: {
    audioPath: "/assets/music/birthday-music.mp3",
    title: "Haareya",
    artist: "Meri Pyaari Bindu",
  },

  // Page 2: Welcome Screen
  welcome: {
    heading: "Yayyyyy! You made it, my shonaaaa! ❤️",
    subheading: "Welcome to your little world, Shristy!",
    paragraphs: [
      "I made this entire place just for you, with little surprises, memories, and lots of love.",
      "So sit back, smile a little, and enjoy this tiny adventure made by your favourite troublemaker.",
      "And remember, every little thing here belongs to you."
    ],
    buttonText: "Let's begin, my love ❤️",
  },

  // Page 3: Collect My Hearts (10 Heart Messages)
  heartGame: {
    instruction: "Tap each floating heart to collect my love! 💕",
    completionMessage: "Congratulations, baby! You collected all my hearts, but they've always belonged to you. ❤️",
    buttonText: "Next surprise, jaannuuuu! ✨",
    messages: [
      "Your smile is literally my favourite notification.",
      "If I could choose again, I'd still choose you.",
      "Stop being so cute, my heart can't handle it.",
      "You're my favourite person to annoy forever.",
      "My heart has officially made you its permanent address.",
      "One hug from you can fix my entire day.",
      "You're prettier than all the stars.",
      "I fall for you a little more every day.",
      "My favourite place is you always will be you.",
      "All my hearts are yours, Jannnnuuu."
    ]
  },

  // Page 4: The Love Puzzle (4x4 Sliding Puzzle)
  puzzle: {
    imagePath: "/assets/photos/puzzle-image.jpg",
    placeholderTitle: "Our Sweet Photo Puzzle",
    instruction: "Slide the tiles to assemble our photo together! Can you solve it, baby?",
    solveForMeButton: "Solve it for me, Jannnnuuu! 🥺❤️",
    completionHeading: "You did it! ❤️",
    completionMessage: "Hehehe, Jab tak mai hu tab tk tension ki kya baat.\n\nAnd honestly, I just want us to solve every little puzzle of life together. ❤️",
    buttonText: "One more surprise, baby! 💌",
  },

  // Page 5: Love Letter & Hidden Secret Letter
  letters: {
    envelopeHeading: "A letter written with all my heart.",
    envelopeInstruction: "Tap the envelope, princess. 💌",
    mainLetter: {
      salutation: "To my one and only, Shristy ❤️",
      opening: "Happy Birthday, my Jannnnuuu!",
      paragraphs: [
        "I don't know whether words will ever be enough to explain how special you are to me, but I still want to try as you know i am little bad with words,Surrrriiii",
        "You make my ordinary days feel extraordinary. Your smile, your laughter, your little habits, and even the smallest things about you make my world a little more beautiful.",
        "I know neither of us is perfect, and we may have our ups and downs, but I want you to know that you mean so much to me.",
        "I hope this new year of your life brings you endless happiness, beautiful opportunities, success, and countless reasons to smile.",
        "I hope I get to be part of many more birthdays, memories, adventures, and little moments with you.",
        "Never stop smiling, never stop being yourself, and never forget how incredibly special you are.",
        "I love youuu so much, Jannnnuuu! ❤️"
      ],
      signature: "Forever your favourite troublemaker."
    },
    secretLetter: {
      teaserPrompt: "Pssst... there's one more little secret for you.",
      title: "One little secret, Shristy...",
      paragraphs: [
        "Sometimes I look at you and wonder how I got so lucky to have someone like you in my life.Thank you for everything that you have done for me.",
        "You might not even realize how many times you've made me smile without doing anything special.",
        "It's not just the big moments. It's your random conversations, your silly little expressions, your voice, and all those tiny things that make you YOU.",
        "If I could pause time, I'd save some of our happiest moments and replay them whenever I miss you.Jo ki maine rakhe hau kuch kuch.",
        "And if I get one wish today, it would be to keep making beautiful memories with you and i want you to be always happy kyuki tumhare mood se hi sb hai jaaannuuuu",
        "I love you, my Jannnnuuu. More than this little website could ever explain. ❤️"
      ]
    },
    buttonText: "Let's look at our memories 🕰️",
  },

  // Page 6: Our Relationship Timeline (TEXT ONLY - Absolutely NO photos!)
  timeline: {
    heading: "Our Romantic Journey 🕰️",
    subheading: "Every second with you is a memory I cherish.",
    milestones: [
      {
        id: 1,
        title: "THE DAY WE MET",
        date: "The Magical Beginning",
        message: "Little did I know that this day would become the beginning of something so special.That days when we joke about ok jannnuuu",
        tag: "Chapter 1",
        icon: "sparkles"
      },
      {
        id: 2,
        title: "OUR FIRST SPECIAL MOMENT",
        date: "When Time Stood Still",
        message: "One of those moments I wish I could experience again.That late nights talk sharing everything.",
        tag: "Heartbeats",
        icon: "heart"
      },
      {
        id: 3,
        title: "OUR FAVOURITE MEMORY",
        date: "Golden Sunshine",
        message: "One of my favourite chapters in our little story.we are laughing together even on the silliest joke, how happy you are just by teasing me a little",
        tag: "Pure Joy",
        icon: "smile"
      },
      {
        id: 4,
        title: "OUR STORY CONTINUES",
        date: "To Infinity & Beyond",
        message: "This isn't the end of our story. It's just another beautiful chapter.",
        tag: "Ever After",
        icon: "infinity"
      }
    ],
    closingMessage: "Every love story has beautiful chapters. I'm so happy ours is still being written.",
    buttonText: "Let's revisit our memories ❤️"
  },

  // Page 7: Memory Gallery (EXACTLY 6 PHOTOS)
  gallery: {
    heading: "Our Little Memory Lane 📸",
    subheading: "Moments captured, love preserved forever.",
    closingMessage: "Six pictures, countless memories, and a million more moments waiting for us.",
    buttonText: "Okayyy birthday girl, let's celebrate! 🎉",
    photos: [
      {
        id: 1,
        src: "/assets/photos/photo1.jpg",
        caption: "How cute you always look just love you",
        dateBadge: "Memory #1"
      },
      {
        id: 2,
        src: "/assets/photos/photo2.jpg",
        caption: "Always the most beautifull girl in any room.",
        dateBadge: "Memory #2"
      },
      {
        id: 3,
        src: "/assets/photos/photo3.jpg",
        caption: "This little cutie deserves all universe.",
        dateBadge: "Memory #3"
      },
      {
        id: 4,
        src: "/assets/photos/photo4.jpg",
        caption: "Even the Universe, galaxies, moon and all the stars would be jealous of you.",
        dateBadge: "Memory #4"
      },
      {
        id: 5,
        src: "/assets/photos/photo5.jpg",
        caption: "See the overloaded cuteness. My Minnie mouse",
        dateBadge: "Memory #5"
      },
      {
        id: 6,
        src: "/assets/photos/photo6.jpg",
        caption: "My cutie when sad but don't worry your jaannnuu will be always by your side",
        dateBadge: "Memory #6"
      }
    ]
  },

  // Page 8: Three Promises For You
  promises: {
    heading: "Three Promises For You ❤️",
    subheading: "From my heart to yours, today, tomorrow and every day.",
    cards: [
      {
        id: 1,
        title: "ALWAYS SUPPORT YOU",
        preview: "A promise for your dreams...",
        description: "I promise to support your dreams, celebrate your achievements, and stand beside you when things get difficult.\n\nI want to see you achieve everything you've ever dreamed of.",
        color: "from-rose-400 to-pink-500",
        icon: "sparkles"
      },
      {
        id: 2,
        title: "ALWAYS MAKE YOU SMILE",
        preview: "A promise for your happiness...",
        description: "I promise to keep annoying you, making silly jokes, teasing you, and doing my best to make you smile even on your worst days.",
        color: "from-pink-500 to-rose-600",
        icon: "heart"
      },
      {
        id: 3,
        title: "KEEP CREATING MEMORIES",
        preview: "A promise for our forever...",
        description: "I promise to keep making beautiful memories with you, enjoy the little moments, and never stop appreciating having you in my life.",
        color: "from-red-400 to-rose-500",
        icon: "star"
      }
    ],
    completionMessage: "These aren't just birthday promises. They're little reminders of how much you mean to me. Aur hn mana thoda kam bolta hu pr jaannnnuuu you are my universe ",
    buttonText: "Now let's cut your birthday cake! 🎂"
  },

  // Page 9: Birthday Cake
  cake: {
    heading: "Make a wish, princess! ✨",
    subheading: "Close your eyes, think of the happiest wish in your heart, and blow out the candles!",
    blowButtonText: "Blow Candles 🕯️💨",
    micBlowPrompt: "You can blow into your mic or tap the button!",
    cutButtonText: "Cut the Birthday Cake 🍰🔪",
    birthdayMessage: "I wish I could be right there beside you, stealing the first bite and giving you the biggest birthday hug. ❤️\n\nMay every wish you make today find its way to you.",
    buttonText: "Ready for your final surprise? 🎆"
  },

  // Page 10: The Grand Birthday Finale
  finale: {
    mainHeading: "HAPPIEST BIRTHDAY, MY PRETTIEST SHRISTY, MY JAAANNNNUUUU, MY SHONAAAA! ❤️",
    imagePath: "/assets/photos/shristy-final.jpg",
    imagePlaceholderCaption: "The Queen of My Heart, Shristy 👑",
    paragraphs: [
      "Happy Birthday to the girl who makes my world brighter, my days happier, and my heart fuller.",
      "I hope you never run out of reasons to smile.",
      "You deserve all the love, happiness, success, and magic in this world.",
      "Keep being the beautiful person you are.",
      "I love youuu so much, my Jannnnuuu! ❤️"
    ],
    signature: "Made with infinite love, just for you.",
    replayButtonText: "Revisit Our Wonderland From The Start 🔄💕"
  }
};

