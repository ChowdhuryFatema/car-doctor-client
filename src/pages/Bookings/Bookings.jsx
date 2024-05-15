import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    const url = `/bookings?email=${user?.email}`;
    
    useEffect(() => {

        // axios.get(url, {withCredentials: true})
        // .then(data => {
        //     setBookings(data.data)
        // })

        // fetch(url, {credentials: 'include'})
        //     .then(res => res.json())
        //     .then(data => {
        //         setBookings(data)
        //     })

        axiosSecure.get(url)
        .then(res => setBookings(res.data))

    }, [url, axiosSecure])

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete')
        if(proceed){
            fetch(`https://car-doctor-server-seven-lemon.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining)

            })
        }
    }

    const handleConfirm = id => {
        fetch(`https://car-doctor-server-seven-lemon.vercel.app/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({status: 'confirm'})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if(data.modifiedCount > 0){
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.find(booking => booking._id == id) 
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining]
                    setBookings(newBookings)
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto px-5 my-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <button className="btn btn-sm btn-circle btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleConfirm={handleConfirm}></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;