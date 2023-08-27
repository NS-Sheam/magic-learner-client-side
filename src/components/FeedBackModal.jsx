
const FeedBackModal = ({ setModalOpen, selectedClass, handleStatus, setFeedbackMassage }) => {
    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 lg:p-10 rounded-lg border shadow-2xl w-1/2 h-[70vh]'>
            <form method="dialog" className="space-y-4">
                <button
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle btn-ghost absolute text-black right-2 top-2 border border-black"
                    onClick={() => setModalOpen(false)} // Close the modal
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg">{handleStatus || setFeedbackMassage ? "Send feedback about why you removed" : "Why admin removed"} {selectedClass?.title}</h3>

                {
                    handleStatus || setFeedbackMassage ?
                        <>
                            <textarea onChange={(event) => setFeedbackMassage(event.target.value)} className="textarea textarea-bordered w-full h-56" placeholder="Feedback"></textarea>
                            <button
                                onClick={() => {
                                    handleStatus(selectedClass._id, "denied")
                                    setModalOpen(false)
                                }}
                                className="cursor-auto px-2 py-1 rounded-md border-2 text-white-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold"
                            >
                                Send Feedback
                            </button>
                        </>
                        :
                        <p>{selectedClass?.feedback}</p>
                }

            </form>
        </div >
    );
};

export default FeedBackModal;