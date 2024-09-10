import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RegisterPage from './pages/authPages/RegisterPage.jsx'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'
import ManagerPage from "./pages/managerPages/ManagerPage.jsx";
import LoginPage from "./pages/authPages/LoginPage.jsx";
import StudentPage from "./pages/studentPages/StudentPage.jsx"
import Schedule from "./components/diaryComponents/schedule/Schedule.jsx";
import {ConfigProvider} from "antd";
import ru_RU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import Homeworks from "./components/diaryComponents/homework/Homeworks.jsx";
import AllMarks from "./components/diaryComponents/mark/AllMarks.jsx";


dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={ru_RU}>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/manager" element={<ManagerPage />} />
                <Route path="/student/*" element={<StudentPage />} >
                    <Route path="diary" element={<Schedule />} />
                    <Route path="homeworks" element={<Homeworks />}/>
                    <Route path="all_marks" element={<AllMarks />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ConfigProvider>
)
