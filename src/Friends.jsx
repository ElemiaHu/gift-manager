import { useState } from "react";
import { fetchClaimFriendGift, fetchFriendUserData } from "./services";
import { ERROR, ERROR_MESSAGES } from "./constants";
import BirthdayInfo from "./BirthdayInfo";
import Loading from "./Loading";
import search from "./media/search.svg";

function Friends({ onLogout, username }) {
    const [ friend, setFriend ] = useState('');
    const [ friendData, setFriendData ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ friendUsername, setFriendUsername ] = useState(''); 
    const [ friendBirthday, setFriendBirthday ] = useState('');
    const [ friendGiftList, setFriendGiftList ] = useState('');
    const [ error, setError ] = useState('');

    function onSearchFriend(friendUsername) {
        setFriendData(false);
        setLoading(true);
        fetchFriendUserData(friendUsername)
        .then( response => {
            setLoading(false);
            setError('');
            setFriendData(true);
            setFriendUsername(response.friendUsername);
            setFriendBirthday(response.birthday);
            setFriendGiftList(response.giftList);
        })
        .catch( error => {
            setLoading(false);
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else setError(ERROR_MESSAGES[error.error]);
        })
    }

    function onClaimGift(friendUsername, id) {
        fetchClaimFriendGift(friendUsername, id)
        .then( response => {
            setFriendGiftList({
                ...friendGiftList,
                [response.id]: response,
            })
            setError('');
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else setError(ERROR_MESSAGES[error.error]);
        })
    }

    return (
        <div className="friends-container">
            <div className="search-container">
                <img src={search} alt="illustration of searching"/>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(!friend) setError(ERROR_MESSAGES[ERROR.REQUIRED_FRIEND_USERNAME]);
                    else onSearchFriend(friend);
                    setFriend('');
                }}>
                    <input type="text" placeholder="Search a friend..."
                        value={friend || ''} className="friend-input"
                        onInput={(e) => setFriend(e.target.value)}/>
                </form>
                <div className="error">{error}</div>
            </div>

            { loading && <Loading />}

            { friendData &&
            <div className="friend-data">
                <div className="friend-username">{friendUsername}</div>
                { friendBirthday && <BirthdayInfo birthday={new Date(friendBirthday)} person={`${friendUsername}'s`}/> }
                { !friendBirthday && <div className="no-data">It seems that your friend hasn't added a valid birthday.</div> }
                { Object.keys(friendGiftList).length === 0 && <div  className="no-data">Oops, no gift found.</div> }
                <div className="friend-gifts">
                    {Object.values(friendGiftList).map(gift => (
                        <div key={gift.id} className="friend-gift-item">
                            <span className="friend-gift-content">{gift.gift}</span>

                            {/* If the gift item was not claimed, current user can claim. */}
                            {/* If the gift item was claimed by current user, current user can cancel. */}
                            {/* If the gift item was claimed by other users, current user cannot edit. */}
                            { gift.claimedBy === 'dog' && <button onClick={() => onClaimGift(friendUsername, gift.id)}>Claim</button> }
                            { gift.claimedBy === username && <span> claimed by you<button onClick={() => onClaimGift(friendUsername, gift.id)}>Cancel</button></span> }
                            { gift.claimedBy !== 'dog' && gift.claimedBy !== username && <span> claimed by {gift.claimedBy}</span>}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Friends;