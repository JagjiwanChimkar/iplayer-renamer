"use strict";

const path = require("path");
const zeroFill = require("zero-fill");
const titlecase = require("titlecase");

// The_Great_British_Bake_Off_Series_7_-_1._Cake_Week_b07r246c_default
const reCategorisedSeriesEpisodeData = /^.+_Series_(\d+)_-_(\d+)\._.+_\w{8}_default$/;
const reCategorisedSeriesEpisodeTitle = /^.+_Series_\d+_-_\d+\._(.+)_\w{8}_default$/;
const reCategorisedSeriesProgrammeTitles = /^(.+)_Series_\d+_-_\d+\._.+_\w{8}_default$/;

// The_Flying_Archaeologist_-_1._Stonehenge_The_Missing_Link_b01s1ll4_default
const reNewEpisodeFormatEpisodeData = /^.+_-_(\d+)\._.+_\w{8}_default$/;
const reNewEpisodeFormatEpisodeProgrammeTitles = /^(.+)_-_\d+\._.+_\w{8}_default$/;
const reNewEpisodeFormatEpisodeTitle = /^.+_-_\d+\._(.+)_\w{8}_default$/;

// Bright_Lights_Brilliant_Minds_-_A_Tale_of_Three_Cities_1._Vienna_1908_b04f83xq_default
const reOldEpisodeFormatEpisodeData = /^.+[^_][^-]_(\d+)\._.+_\w{8}_default$/;
const reOldEpisodeFormatEpisodeTitle = /^.+[^_][^-]_\d+\._(.+)_\w{8}_default$/;
const reOldEpisodeFormatProgrammeTitles = /^(.+[^_][^-])_\d+\._.+_\w{8}_default$/;

// The_French_Revolution_-_Tearing_up_History_b042ttxl_default
const reStandaloneEpisodeProgrammeTitles = /^(.+)_\w{8}_default$/;

function createNewFilenames(filePaths) {
  return filePaths.map(filePath => {
    const directory = path.dirname(filePath);
    const extension = path.extname(filePath);
    const filename = path.basename(filePath, extension);

    if (extension !== ".mp4" && extension !== ".srt") {
      return null;
    }

    const newFilename = createNewFilename(filename, extension);
    if (newFilename === null) {
      return null;
    }

    return {
      directory: directory,
      oldFilename: path.basename(filePath),
      newFilename:  newFilename
    };
  });
}

function createNewFilename(filename, extension) {
  if (isValidFilename(filename) === false) {
    return null;
  }

  const programmeTitles = getProgrammeTitles(filename);
  const episodeData = getEpisodeData(filename);
  const episodeTitle = getEpisodeTitle(filename);

  let newFilename = programmeTitles.title;

  if (
    programmeTitles.subtitle &&
    programmeTitles.subtitle !== programmeTitles.title
  ) {
    newFilename += ` - ${programmeTitles.subtitle}`;
  }

  if (episodeData) {
    const series = zeroFill(2, episodeData.series);
    const episode = zeroFill(2, episodeData.episode);

    newFilename += ` - s${series}e${episode}`;
  }

  if (episodeTitle) {
    newFilename += ` - ${episodeTitle}`;
  }

  if (extension === ".srt") {
    newFilename += ".en";
  }

  newFilename += extension;

  return newFilename;
}

function isValidFilename(filename) {
  return /^.+_\w{8}_default$/.test(filename);
}

function getProgrammeTitles(filename) {
  let programmeTitlesMatch = [
    filename.match(reCategorisedSeriesProgrammeTitles),
    filename.match(reNewEpisodeFormatEpisodeProgrammeTitles),
    filename.match(reOldEpisodeFormatProgrammeTitles),
    filename.match(reStandaloneEpisodeProgrammeTitles),
  ].find(Boolean);

  let title = programmeTitlesMatch[1];
  let subtitle = null;

  // If the title contains a "_-_" divider
  // we know the programme title consists of both a title and a subtitle
  if (/_-_/.test(title)) {
    const titleParts = title.split("_-_");

    title = titleParts[0];
    subtitle = titleParts[1];
  }

  return {
    title: title ? titlecase(title.replace(/_/g, " ")) : null,
    subtitle: subtitle ? titlecase(subtitle.replace(/_/g, " ")) : null
  };
}

function getEpisodeData(filename) {
  const episodeDataMatch = [
    filename.match(reCategorisedSeriesEpisodeData),
    filename.match(reNewEpisodeFormatEpisodeData),
    filename.match(reOldEpisodeFormatEpisodeData)
  ].find(Boolean);

  if (episodeDataMatch == null) {
    return null;
  }

  const seriesNumber = episodeDataMatch.length == 3 ? episodeDataMatch[1] : "1";
  const episodeNumber = episodeDataMatch.length == 3
    ? episodeDataMatch[2]
    : episodeDataMatch[1];

  return {
    series: parseInt(seriesNumber, 10),
    episode: parseInt(episodeNumber, 10)
  };
}

function getEpisodeTitle(filename) {
  const episodeTitleMatch = [
    filename.match(reCategorisedSeriesEpisodeTitle),
    filename.match(reNewEpisodeFormatEpisodeTitle),
    filename.match(reOldEpisodeFormatEpisodeTitle)
  ].find(Boolean);

  if (episodeTitleMatch == null) {
    return null;
  }

  const title = episodeTitleMatch[1].replace(/_/g, " ");
  return titlecase(title);
}

module.exports = {
  createNewFilenames,
  createNewFilename,
  isValidFilename,
  getProgrammeTitles,
  getEpisodeData,
  getEpisodeTitle
};
