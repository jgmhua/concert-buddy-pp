import "./FriendList.scss";

export default function FriendList({ friendsInfo, setShowFriends }) {
	return (
		<>
			<div className="friends__top">
				<div className="friends__header-div">
					<h3 className="friends__header">
						Playlist Buddies<small>*</small>
					</h3>
					<p className="friends__asterisk">
						<small>*List of users displayed may not be complete.</small>
					</p>
				</div>
				<span
					className="material-symbols-outlined material-symbols-outlined--close"
					onClick={() => setShowFriends(false)}
				>
					close
				</span>
			</div>
			<ul className="friends__list">
				{friendsInfo.map((friend) => {
					return (
						<li className="friend" key={friend.id}>
							<p className="friend__name">{friend.display_name}</p>
							<div
								className={`friend__pic-div ${
									friend.images.length == 0 ? "friend__pic-div--default" : ""
								}`}
							>
								{friend.images.length > 0 ? (
									<img className="friend__pic" src={friend.images[0].url} />
								) : (
									<div className="friend__pic friend__pic--default"></div>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}
