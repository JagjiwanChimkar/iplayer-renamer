"use strict";

const renamer = require("./iplayer-renamer");

// The_Fairytale_Castles_of_King_Ludwig_II_with_Dan_Cruickshank_-_The_Fairytale_Castles_of_King_Ludwig_II_with_Dan_Cruickshank_b036f9vc_default

const examples = {
  "a programme title and a subtitle": {
    episodeData: null,
    episodeTitle: null,
    newFilename: "The French Revolution - Tearing Up History",
    oldFilename: "The_French_Revolution_-_Tearing_up_History_b042ttxl_default",
    subtitle: "Tearing Up History",
    title: "The French Revolution"
  },
  "a programme title, an old format episode number, and an episode title": {
    episodeData: { series: 1, episode: 1 },
    episodeTitle: "Episode Title",
    newFilename: "Title - s01e01 - Episode Title",
    oldFilename: "Title_1._Episode_Title_b07r246c_default",
    subtitle: null,
    title: "Title"
  },
  "a programme title, a new format episode number, and an episode title": {
    episodeData: { series: 1, episode: 1 },
    episodeTitle: "Stonehenge the Missing Link",
    newFilename: "The Flying Archaeologist - s01e01 - Stonehenge the Missing Link",
    oldFilename: "The_Flying_Archaeologist_-_1._Stonehenge_The_Missing_Link_b01s1ll4_default",
    subtitle: null,
    title: "The Flying Archaeologist"
  },
  "a programme title, a categorised series number, a new format episode number, and an episode title": {
    episodeData: { series: 7, episode: 1 },
    episodeTitle: "Cake Week",
    newFilename: "The Great British Bake Off - s07e01 - Cake Week",
    oldFilename: "The_Great_British_Bake_Off_Series_7_-_1._Cake_Week_b07r246c_default",
    subtitle: null,
    title: "The Great British Bake Off"
  },
  "a programme title, a subtitle, an old format episode number, and an episode title": {
    episodeData: { series: 1, episode: 1 },
    episodeTitle: "Vienna 1908",
    newFilename: "Bright Lights Brilliant Minds - A Tale of Three Cities - s01e01 - Vienna 1908",
    oldFilename: "Bright_Lights_Brilliant_Minds_-_A_Tale_of_Three_Cities_1._Vienna_1908_b04f83xq_default",
    subtitle: "A Tale of Three Cities",
    title: "Bright Lights Brilliant Minds"
  }
}

describe("createNewFilenames()", () => {
 test("should convert a list of valid filenames", () => {
   const actual = renamer.createNewFilenames([
    `test/${examples["a programme title and a subtitle"].oldFilename}.mp4`,
    `test/${examples["a programme title, an old format episode number, and an episode title"].oldFilename}.mp4`,
    `test/${examples["a programme title, a new format episode number, and an episode title"].oldFilename}.mp4`,
    `test/${examples["a programme title, a categorised series number, a new format episode number, and an episode title"].oldFilename}.mp4`,
    `test/${examples["a programme title, a subtitle, an old format episode number, and an episode title"].oldFilename}.mp4`
  ]);

   const expected = [
    {
      directory: "test",
      oldFilename: `${examples["a programme title and a subtitle"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title and a subtitle"].newFilename}.mp4`
    },
    {
      directory: "test",
      oldFilename: `${examples["a programme title, an old format episode number, and an episode title"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title, an old format episode number, and an episode title"].newFilename}.mp4`
    },
    {
      directory: "test",
      oldFilename: `${examples["a programme title, a new format episode number, and an episode title"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title, a new format episode number, and an episode title"].newFilename}.mp4`
    },
    {
      directory: "test",
      oldFilename: `${examples["a programme title, a categorised series number, a new format episode number, and an episode title"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title, a categorised series number, a new format episode number, and an episode title"].newFilename}.mp4`
    },
    {
      directory: "test",
      oldFilename: `${examples["a programme title, a subtitle, an old format episode number, and an episode title"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title, a subtitle, an old format episode number, and an episode title"].newFilename}.mp4`
    }
   ];

   expect(actual).toEqual(expected);
 });

 test("should handle a mix of valid and invalid filenames and return null for invalid filenames", () => {
   const actual = renamer.createNewFilenames([
    `test/${examples["a programme title and a subtitle"].oldFilename}.mp4`,
    `test/foobar.mp4`,
  ]);

   const expected = [
    {
      directory: "test",
      oldFilename: `${examples["a programme title and a subtitle"].oldFilename}.mp4`,
      newFilename: `${examples["a programme title and a subtitle"].newFilename}.mp4`
    },
    null
   ];

   expect(actual).toEqual(expected);
 });
});

describe("createNewFilename()", () => {
  describe("with an .mp4 extension", () => {
    test("should create a new filename from a filename with a programme title and a subtitle", () => {
      const example = examples["a programme title and a subtitle"];

      const actual = renamer.createNewFilename(example.oldFilename, ".mp4");
      const expected = `${example.newFilename}.mp4`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename from a filename with a programme title, an old format episode number, and an episode title", () => {
      const example = examples["a programme title, an old format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".mp4");
      const expected = `${example.newFilename}.mp4`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename from a filename with a programme title, a new format episode number, and an episode title", () => {
      const example = examples["a programme title, a new format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".mp4");
      const expected = `${example.newFilename}.mp4`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename from a filename with a programme title, a categorised series number, a new format episode number, and an episode title", () => {
      const example = examples["a programme title, a categorised series number, a new format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".mp4");
      const expected = `${example.newFilename}.mp4`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename from a filename with a programme title, a subtitle, an old format episode number, and an episode title", () => {
      const example = examples["a programme title, a subtitle, an old format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".mp4");
      const expected = `${example.newFilename}.mp4`;

      expect(actual).toEqual(expected);
    });
  });

  describe("with an .srt extension", () => {
    test("should create a new filename with an \"en\" language code from a filename with a programme title and a subtitle", () => {
      const example = examples["a programme title and a subtitle"];

      const actual = renamer.createNewFilename(example.oldFilename, ".srt");
      const expected = `${example.newFilename}.en.srt`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename with an \"en\" language code from a filename with a programme title, an old format episode number, and an episode title", () => {
      const example = examples["a programme title, an old format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".srt");
      const expected = `${example.newFilename}.en.srt`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename with an \"en\" language code from a filename with a programme title, a new format episode number, and an episode title", () => {
      const example = examples["a programme title, a new format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".srt");
      const expected = `${example.newFilename}.en.srt`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename with an \"en\" language code from a filename with a programme title, a categorised series number, a new format episode number, and an episode title", () => {
      const example = examples["a programme title, a categorised series number, a new format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".srt");
      const expected = `${example.newFilename}.en.srt`;

      expect(actual).toEqual(expected);
    });

    test("should create a new filename with an \"en\" language code from a filename with a programme title, a subtitle, an old format episode number, and an episode title", () => {
      const example = examples["a programme title, a subtitle, an old format episode number, and an episode title"];

      const actual = renamer.createNewFilename(example.oldFilename, ".srt");
      const expected = `${example.newFilename}.en.srt`;

      expect(actual).toEqual(expected);
    });
  });
});

describe("isValidFilename()", () => {
  test("should return \"true\" for a filename with a get_iplayer filename ending", () => {
    const actual = renamer.isValidFilename("foobar_b04f83xq_default");
    expect(actual).toBe(true);
  });

  test("should return \"false\" for a filename with a get_iplayer filename ending with too many hash characters", () => {
    const actual = renamer.isValidFilename("foobar_b04f83xq4_default");
    expect(actual).toBe(false);
  });

  test("should return \"false\" for a filename with a get_iplayer filename ending with too few hash characters", () => {
    const actual = renamer.isValidFilename("foobar_b04f83x_default");
    expect(actual).toBe(false);
  });

  test("should return \"false\" for a filename without a get_iplayer filename ending", () => {
    const actual = renamer.isValidFilename("foobar");
    expect(actual).toBe(false);
  });
});

describe("getProgrammeTitles()", () => {
  test("should get programme titles from a filename with a programme title and a subtitle", () => {
    const example = examples["a programme title and a subtitle"];

    const actual = renamer.getProgrammeTitles(example.oldFilename);
    const expected = example.title;

    expect(actual.title).toEqual(example.title);
    expect(actual.subtitle).toEqual(example.subtitle);
  });

  test("should get programme titles from a filename with a programme title, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, an old format episode number, and an episode title"];

    const actual = renamer.getProgrammeTitles(example.oldFilename);
    const expected = example.title;

    expect(actual.title).toEqual(example.title);
    expect(actual.subtitle).toEqual(example.subtitle);
  });

  test("should get programme titles from a filename with a programme title, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a new format episode number, and an episode title"];

    const actual = renamer.getProgrammeTitles(example.oldFilename);
    const expected = example.title;

    expect(actual.title).toEqual(example.title);
    expect(actual.subtitle).toEqual(example.subtitle);
  });

  test("should get programme titles from a filename with a programme title, a categorised series number, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a categorised series number, a new format episode number, and an episode title"];

    const actual = renamer.getProgrammeTitles(example.oldFilename);
    const expected = example.title;

    expect(actual.title).toEqual(example.title);
    expect(actual.subtitle).toEqual(example.subtitle);
  });

  test("should get programme titles from a filename with a programme title, a subtitle, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, a subtitle, an old format episode number, and an episode title"];

    const actual = renamer.getProgrammeTitles(example.oldFilename);
    const expected = example.title;

    expect(actual.title).toEqual(example.title);
    expect(actual.subtitle).toEqual(example.subtitle);
  });
});

describe("getEpisodeData()", () => {
  test("should get episode data from a filename with a programme title and a subtitle", () => {
    const example = examples["a programme title and a subtitle"];

    const actual = renamer.getEpisodeData(example.oldFilename);
    const expected = example.episodeData;

    expect(actual).toEqual(example.episodeData);
  });

  test("should get episode data from a filename with a programme title, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, an old format episode number, and an episode title"];

    const actual = renamer.getEpisodeData(example.oldFilename);
    const expected = example.episodeData;

    expect(actual).toEqual(example.episodeData);
  });

  test("should get episode data from a filename with a programme title, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a new format episode number, and an episode title"];

    const actual = renamer.getEpisodeData(example.oldFilename);
    const expected = example.episodeData;

    expect(actual).toEqual(example.episodeData);
  });

  test("should get episode data from a filename with a programme title, a categorised series number, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a categorised series number, a new format episode number, and an episode title"];

    const actual = renamer.getEpisodeData(example.oldFilename);
    const expected = example.episodeData;

    expect(actual).toEqual(example.episodeData);
  });

  test("should get episode data from a filename with a programme title, a subtitle, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, a subtitle, an old format episode number, and an episode title"];

    const actual = renamer.getEpisodeData(example.oldFilename);
    const expected = example.episodeData;

    expect(actual).toEqual(example.episodeData);
  });
});

describe("getEpisodeTitle()", () => {
  test("should get episode title from a filename with a programme title and a subtitle", () => {
    const example = examples["a programme title and a subtitle"];

    const actual = renamer.getEpisodeTitle(example.oldFilename);
    const expected = example.episodeTitle;

    expect(actual).toEqual(example.episodeTitle);
  });

  test("should get episode title from a filename with a programme title, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, an old format episode number, and an episode title"];

    const actual = renamer.getEpisodeTitle(example.oldFilename);
    const expected = example.episodeTitle;

    expect(actual).toEqual(example.episodeTitle);
  });

  test("should get episode title from a filename with a programme title, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a new format episode number, and an episode title"];

    const actual = renamer.getEpisodeTitle(example.oldFilename);
    const expected = example.episodeTitle;

    expect(actual).toEqual(example.episodeTitle);
  });

  test("should get episode title from a filename with a programme title, a categorised series number, a new format episode number, and an episode title", () => {
    const example = examples["a programme title, a categorised series number, a new format episode number, and an episode title"];

    const actual = renamer.getEpisodeTitle(example.oldFilename);
    const expected = example.episodeTitle;

    expect(actual).toEqual(example.episodeTitle);
  });

  test("should get episode title from a filename with a programme title, a subtitle, an old format episode number, and an episode title", () => {
    const example = examples["a programme title, a subtitle, an old format episode number, and an episode title"];

    const actual = renamer.getEpisodeTitle(example.oldFilename);
    const expected = example.episodeTitle;

    expect(actual).toEqual(example.episodeTitle);
  });
});
