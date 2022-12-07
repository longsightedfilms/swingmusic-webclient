"""
Contains all the models for objects generation and typing.
"""
import dataclasses
import json
from dataclasses import dataclass

from app import utils

# from operator import itemgetter


@dataclass(slots=True)
class Artist:
    """
    Artist class
    """

    name: str
    artisthash: str = ""
    image: str = ""
    trackcount: int = 0
    albumcount: int = 0
    duration: int = 0
    colors: list[str] = dataclasses.field(default_factory=list)

    def __post_init__(self):
        self.artisthash = utils.create_hash(self.name)
        self.image = self.artisthash + ".webp"
        self.colors = json.loads(str(self.colors))


@dataclass(slots=True)
class Track:
    """
    Track class
    """

    # id: int
    album: str
    albumartist: str
    albumhash: str
    artist: str | list[Artist]
    bitrate: int
    copyright: str
    date: str
    disc: int
    duration: int
    filepath: str
    folder: str
    genre: str | list[str]
    title: str
    track: int
    trackhash: str

    filetype: str = ""
    image: str = ""
    artist_hashes: list[str] = dataclasses.field(default_factory=list)

    def __post_init__(self):
        if self.artist is not None:
            artist_str = str(self.artist).split(", ")
            self.artist_hashes = [utils.create_hash(a) for a in artist_str]

            self.artist = [Artist(a) for a in artist_str]

        self.filetype = self.filepath.rsplit(".", maxsplit=1)[-1]
        self.image = self.albumhash + ".webp"

        if self.genre is not None:
            self.genre = str(self.genre).replace("/", ", ")
            self.genre = str(self.genre).lower().split(", ")


@dataclass
class Album:
    """
    Creates an album object
    """

    albumartists: str | list[Artist]
    albumhash: str
    colors: str | list[str]
    copyright: str
    date: int
    title: str

    albumartisthash: str = ""
    image: str = ""
    count: int = 0
    duration: int = 0

    is_soundtrack: bool = False
    is_compilation: bool = False
    is_single: bool = False
    is_EP: bool = False
    genres: list[str] = dataclasses.field(default_factory=list)

    def __post_init__(self):
        self.image = self.albumhash + ".webp"

        artists = str(self.albumartists).split(", ")
        artists = [utils.create_hash(a) for a in artists]

        self.albumartisthash = "-".join(artists)
        self.albumartisthash = f"-{self.albumartisthash}-"

        if self.colors is not None:
            self.colors = json.loads(str(self.colors))

        if self.albumartists is not None:
            artists = str(self.albumartists).split(", ")
            self.albumartists = []

            for artist in artists:
                self.albumartists.append(Artist(artist))

    def check_type(self):
        """
        Runs all the checks to determine the type of album.
        """
        self.is_soundtrack = self.check_is_soundtrack()
        if self.is_soundtrack:
            return

        self.is_compilation = self.check_is_compilation()
        if self.is_compilation:
            return

        self.is_EP = self.check_is_EP()

    def check_is_soundtrack(self) -> bool:
        """
        Checks if the album is a soundtrack.
        """
        keywords = ["motion picture", "soundtrack"]
        for keyword in keywords:
            if keyword in self.title.lower():
                return True

        return False

    def check_is_compilation(self) -> bool:
        """
        Checks if the album is a compilation.
        """
        artists = [a.name for a in self.albumartists]  # type: ignore
        artists = "".join(artists).lower()

        return "various artists" in artists

    def check_is_EP(self) -> bool:
        """
        Checks if the album is an EP.
        """
        return self.title.strip().endswith(" EP")

    def check_is_single(self, tracks: list[Track]):
        """
        Checks if the album is a single.
        """
        if (
            len(tracks) == 1
            and tracks[0].title == self.title
            and tracks[0].track == 1
            and tracks[0].disc == 1
        ):
            self.is_single = True


@dataclass
class Playlist:
    """Creates playlist objects"""

    id: int
    artisthashes: str | list[str]
    image: str
    last_updated: str
    name: str
    trackhashes: str | list[str]

    thumb: str = ""
    count: int = 0
    duration: int = 0

    # def __init__(self, data):
    #     self.id = data["_id"]["$oid"]
    #     self.tracks = []
    #     self.pretracks = data["pre_tracks"]
    #     self.count = len(self.pretracks)
    #     self.write_props(data)

    def __post_init__(self):
        self.trackhashes = json.loads(str(self.trackhashes))
        self.artisthashes = json.loads(str(self.artisthashes))

        self.count = len(self.trackhashes)

        if self.image is not None:
            self.thumb = "thumb_" + self.image
        else:
            self.image = "None"
            self.thumb = "None"

    # def update_playlist(self, data: dict):
    #     self.write_props(data)

    # TODO: Find a better name for this method
    # def write_props(self, data: dict):
    #     (self.name, self.image, self.thumb, self.last_updated,) = itemgetter(
    #         "name",
    #         "image",
    #         "thumb",
    #         "last_updated",
    #     )(data)


@dataclass
class Folder:
    name: str
    path: str
    has_tracks: bool
    is_sym: bool = False
    path_hash: str = ""
