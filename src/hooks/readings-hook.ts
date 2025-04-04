import axios from "axios";

const api = "http://localhost:3000/api";

const ReadingsHook = (reading: string) => {
    const getRangeValue = async (isMin: boolean) => {
        try {
            const response = await axios.get(`${api}/${reading}?${isMin ? 'min' : 'max'}value=true`);
            if (response.status === 200) {
                // Assuming the response looks like { minimum: 5 } or { maximum: 10 }
                return response.data[isMin ? 'minimum' : 'maximum'];
            } else {
                console.error("Unexpected response status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching range value:", error);
            return null;
        }
    };

    const getReadingsInDateRange = async ( start: Date, end: Date ) => {
        try {
            const startDate = start.toISOString();
            const endDate = end.toISOString();

            const response = await axios.get(`${api}/${reading}?createdAt_lte=${endDate}&createdAt_gte=${startDate}`)

            if (response.status === 200) {
                return response.data; // Assuming the response contains the readings
            } else {
                console.error("Unexpected response status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching readings in date range:", error);
            return null;
        }
    }

    const getAnalyticsData = async (page: number) => {
        try {
            const response = await axios.get(`${api}/${reading}?size=100&page=${page || 1}`);
            if (response.status === 200) {
                return response.data; // Assuming the response contains the readings
            } else {
                console.error("Unexpected response status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching readings in date range:", error);
            return null;
        }
    }

    return {
        getRangeValue, getReadingsInDateRange, getAnalyticsData
    };
};

export default ReadingsHook;
