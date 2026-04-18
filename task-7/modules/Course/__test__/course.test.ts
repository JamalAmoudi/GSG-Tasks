import { title } from "node:process";
import { authedCoachAgent, authedStudentAgent } from "../../../tests/helper/supertest.helper"

describe('user routes endpoints', () => {

    // Forbidden 
    it("POST /api/v1/courses/create STUDENT cannot create course", async () => {
        const response = await authedStudentAgent.post('/api/v1/courses/create');
        expect(response.status).toBe(403)
    })

    // Success
    it("POST /api/v1/courses/create COACH or ADMIN can create a course with valid data", async () => {
        const response = await authedCoachAgent.post('/api/v1/courses/create').send({ title: 'Test', description: 'testing' });
        expect(response.status).toBe(201)
    })

    // Validation Error

    it("POST /api/v1/courses/create Missing required fields returns 400", async () => {
        const response = await authedCoachAgent.post('/api/v1/courses/create').send({ title: '' });
        expect(response.status).toBe(400);
    })
})



//--------------------------------------
//  Test Scenarios for Course Module

// 1. POST /courses
//    - ✅ Success: COACH or ADMIN can create a course with valid data.
//    - ❌ Forbidden: STUDENT cannot create a course.
//    - ❌ Validation Error: Missing required fields returns 400.

// 2. GET /courses
//    - ✅ Success: Returns a list of all courses (public).
//    - ❌ Edge: Returns an empty array when no courses exist.

// 3. GET /courses/:id
//    - ✅ Success: Returns course details when ID is valid.
//    - ❌ Not Found: Returns 404 for invalid course ID.

// 4. PUT /courses/:id
//    - ✅ Success: Course creator (COACH/ADMIN) updates a course successfully.
//    - ❌ Forbidden: STUDENT cannot update courses.
//    - ❌ Not Owner: COACH cannot update a course created by another COACH.

// 5. DELETE /courses/:id
//    - ✅ Success: Course creator (COACH/ADMIN) deletes a course successfully.
//    - ❌ Forbidden: STUDENT cannot delete courses.
//    - ❌ Not Owner: COACH cannot delete a course created by another COACH.

// --------------------------------------