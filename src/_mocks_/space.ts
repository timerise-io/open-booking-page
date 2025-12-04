import { SPACE_PROVIDER } from "../models/booking";

export const space = {
  spaceId: "SPC_zoom123",
  url: "https://zoom.us/j/1234567890",
  title: "Virtual Meeting Room",
  instructions: "Click the link to join the meeting. Please join 5 minutes early.",
  provider: SPACE_PROVIDER.ZOOM,
};

export const spaceGoogleMeet = {
  spaceId: "SPC_meet456",
  url: "https://meet.google.com/abc-defg-hij",
  title: "Google Meet Room",
  instructions: "Join via Google Meet link",
  provider: SPACE_PROVIDER.GOOGLE_MEET,
};

export const spaceTeams = {
  spaceId: "SPC_teams789",
  url: "https://teams.microsoft.com/l/meetup-join/abc123",
  title: "Microsoft Teams Meeting",
  instructions: null,
  provider: SPACE_PROVIDER.TEAMS,
};

export const spaces = [space, spaceGoogleMeet, spaceTeams];
