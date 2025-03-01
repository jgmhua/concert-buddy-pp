import "./InviteForm.scss";

export default function InviteForm({
	handleFriendInvites,
	allEmails,
	setEmailList,
}) {
    
	return (
		<form className="invite__form" onSubmit={handleFriendInvites}>
			<h3>Select Friends</h3>
			<label className="invite__label">
				Enter emails
				<small className="message message--small">
					Enter emails separated by comma.
				</small>
				<input
					className="invite__input"
					name="emails"
					type="email"
					multiple
					placeholder="Ex: friend1@email.com,friend2@email.com"
					onChange={(e) => {
						setEmailList(e.target.value);
					}}
				/>
			</label>
			<div>
				<h4>You're sending invites to the following friends</h4>
				{allEmails &&
					allEmails.map((email) => {
						return <p key={email}>{email}</p>;
					})}
			</div>
			<button type="submit" className="invite__submit">
				Submit
			</button>
		</form>
	);
}
