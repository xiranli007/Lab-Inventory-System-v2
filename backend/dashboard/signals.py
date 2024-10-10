from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Request

@receiver(post_save, sender=Request)
def send_request_notification(sender, instance, created, **kwargs):
    if created:  # This checks if a new request was just created
        subject = 'New Request Added'
        message = f'A new item has been requested:\n\n' \
                  f'Item: {instance.item.name}\n' \
                  f'Quantity: {instance.quantity}\n' \
                  f'Requested by: {instance.personRequest.first_name} {instance.personRequest.last_name}\n' \
                  f'Vendor: {instance.vendor.name}\n\n' \
                  f'Please log in to the system for more details.'

        lab_manager_email = 'wanglab101@gmail.com'  # Replace with the lab manager's actual email

        # Send the email
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [lab_manager_email],
            fail_silently=False,
        )
