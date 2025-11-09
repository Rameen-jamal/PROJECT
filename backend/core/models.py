from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    semester = models.IntegerField(default=1)
    credit_hours = models.IntegerField(default=3)

    # Faculty assigned to course (string reference)
    faculty = models.ForeignKey(
        'faculty.FacultyProfile',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='courses'
    )

    # TAs assigned to course
    tas = models.ManyToManyField(
        'ta.TAProfile',
        blank=True,
        related_name='assigned_courses'
    )

    def __str__(self):
        return f"{self.code} - {self.name}"

class Assignment(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    course = models.ForeignKey(
        'core.Course',
        on_delete=models.CASCADE,
        related_name='assignments'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.course.code})"

class Submission(models.Model):
    assignment = models.ForeignKey(
        'core.Assignment',
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/', null=True, blank=True)
    grade = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)

    class Meta:
        unique_together = ('assignment', 'student')

    def __str__(self):
        return f"{self.student.user.username} - {self.assignment.title}"

class Attendance(models.Model):
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )
    course = models.ForeignKey(
        'core.Course',
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )
    date = models.DateField()
    present = models.BooleanField(default=True)

    class Meta:
        unique_together = ('student', 'course', 'date')

    def __str__(self):
        status = "Present" if self.present else "Absent"
        return f"{self.student.user.username} - {self.course.code} on {self.date}: {status}"
