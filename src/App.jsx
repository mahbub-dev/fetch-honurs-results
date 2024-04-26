import React, { useState } from 'react';

const App = () => {
  const [route, setRoute] = useState('first_year_result_show.php');
  const [rollNumber, setRollNumber] = useState('');
  const [regNo, setRegNo] = useState('');
  const [examYear, setExamYear] = useState('');
  const [error, setError] = useState('');

  const routeOptions = [
    { value: 'first_year_result_show.php', label: '1st Year' },
    { value: 'second_year_result_show.php', label: '2nd Year' },
    { value: 'third_year_result_show.php', label: '3rd Year' },
    { value: 'fourth_year_result_show.php', label: '4th Year' },
    // Add more routes here if needed
  ];

  const examYearOptions = ['2020', '2021', '2022', '2023', '2024', '2025'];

  const handleRouteChange = (e) => {
    setRoute(e.target.value);
  };

  const generateURL = () => {
    const baseURL = 'http://results.nu.ac.bd/honours/';
    const url = `${baseURL}${route}?roll_number=${rollNumber}&reg_no=${regNo}&exam_year=${examYear}`;
    return url;
  };

  const openURL = () => {
    if (!validateFields()) return;
    const url = generateURL();
    window.open(url);
  };

  const copyURL = async () => {
    if (!validateFields()) return;
    const url = generateURL();
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  const validateFields = () => {
    if (!rollNumber || !regNo || !examYear) {
      setError('Please fill in all fields.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-4 md:p-8 max-w-md w-full">
        
        <div className='flex flex-col items-center mb-4'>
          <img src='https://scontent.fdac22-1.fna.fbcdn.net/v/t39.30808-6/294597196_702311634341068_1377418455418279196_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9xndGxICMk8Q7kNvgHnUNzl&_nc_ht=scontent.fdac22-1.fna&oh=00_AfDus0bnNcrOCg2J2fdT15dYubJIPYLRMkWshGq0k24_5w&oe=6631A7FA' alt='d' width={50} height={50} />
          <h1 className='text-sm font-semibold text-center'>Rajshahi Govt. City College, Management-(20-21)</h1>
          <h1 className="text-sm font-semibold text-center mb-2">Generate NU Result</h1>
        </div>
        <div className="space-y-1">
          <div className="flex flex-col">
            <label htmlFor="route" className="font-medium text-sm mb-2">Select Year:</label>
            <select id="route" value={route} onChange={handleRouteChange} className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
              {routeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="rollNumber" className="font-medium text-sm ">Roll Number:</label>
            <input id="rollNumber" type="number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="regNo" className="font-medium text-sm ">Registration Number:</label>
            <input id="regNo" type="number" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="examYear" className="font-medium text-sm ">Exam Year:</label>
            <select id="examYear" value={examYear} onChange={(e) => setExamYear(e.target.value)} className="border border-gray-400 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500">
              {examYearOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={openURL} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Get Result</button>
          <p className='mt-2 text-sm '>If the result is not fetched after clicking the 'Get Result' button, please ensure that your information is correct and try again. If the information provided is accurate, please refresh the page until your results are successfully fetched.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
