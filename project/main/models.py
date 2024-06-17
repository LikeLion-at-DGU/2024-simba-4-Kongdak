from django.db import models

# Create your models here.
class Post(models.Model):
    pub_date = models.DateTimeField()
    title = modles.CharField(max_length=50)
    body = models.TextField()
    WEATHER_CHOICES = [
        ('sunny', '맑음'),
        ('bad', '나쁨'),
    ]
    weather = models.CharField(
        max_length=5,
        choices=WEATHER_CHOICES,
        default='sunny',
    )
    
    def __str__(self):
        return self.title