from django.db import models

from django.db import models
from students.models import StudentProfile

class FeeRecord(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    total_fee = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_payment_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.student} - Due: {self.due_amount}"

