import { ConfigProvider } from "antd"
import ru_RU from "antd/lib/locale/ru_RU"
import dayjs from "dayjs"
import updateLocale from 'dayjs/plugin/updateLocale'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homeworks from "./components/diaryComponents/homework/Homeworks.jsx"
import AllMarks from "./components/diaryComponents/mark/AllMarks.jsx"
import Schedule from "./components/diaryComponents/schedule/Schedule.jsx"
import StudentProfile from './components/studentComponents/StudentProfile.jsx'
import StudentRatings from './components/studentComponents/StudentRatings.jsx'
import './index.css'
import LoginPage from "./pages/authPages/LoginPage.jsx"
import RegisterPage from './pages/authPages/RegisterPage.jsx'
import ManagerPage from "./pages/managerPages/ManagerPage.jsx"
import StudentPage from "./pages/studentPages/StudentPage.jsx"
import TeacherPage from './pages/teacherPages/TeacherPage.jsx'
import AllTeacherClasses from "./components/teacherComponents/AllTeacherClasses.jsx"


dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider
        locale={ru_RU}
    >
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/manager" element={<ManagerPage />} />
                <Route path="/teacher" element={<TeacherPage />} >
                    <Route path="classes/all" element={<AllTeacherClasses />} />
                    <Route path="classes/my" element/>
                    <Route path="schedule" element/>
                    <Route path="events" element/>
                    <Route path="profile" element/>
                </Route>
                <Route path="/student/*" element={<StudentPage />} >
                    <Route path="diary" element={<Schedule />} />
                    <Route path="homeworks" element={<Homeworks />} />
                    <Route path="all_marks" element={<AllMarks />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="rating" element={<StudentRatings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ConfigProvider>
)
