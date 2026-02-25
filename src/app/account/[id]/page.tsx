export default async function UserAccountPage({params}: any) {
    const { id } = await params // params is a promise, so anything depending on params has to be in an async function
    return (
        <div>
            <h1>Account Settings</h1>
            <p>{id}</p>
        </div>
    )
}
