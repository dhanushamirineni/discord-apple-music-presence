on run
    try
        tell application "Music"
            if player state is playing then
                set track_name to name of current track
                set track_artist to artist of current track
                set track_album to album of current track
                set track_duration to duration of current track
                set track_position to player position
                
                -- Calculate remaining time
                set remaining_time to track_duration - track_position
                
                -- Return JSON-like string
                return "{\"playing\":true,\"name\":\"" & track_name & "\",\"artist\":\"" & track_artist & "\",\"album\":\"" & track_album & "\",\"duration\":" & track_duration & ",\"position\":" & track_position & ",\"remaining\":" & remaining_time & "}"
            else if player state is paused then
                set track_name to name of current track
                set track_artist to artist of current track
                set track_album to album of current track
                return "{\"playing\":false,\"paused\":true,\"name\":\"" & track_name & "\",\"artist\":\"" & track_artist & "\",\"album\":\"" & track_album & "\"}"
            else
                return "{\"playing\":false,\"paused\":false}"
            end if
        end tell
    on error
        return "{\"playing\":false,\"error\":true}"
    end try
end run
