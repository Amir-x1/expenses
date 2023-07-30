from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email
from django.contrib import messages
from django.core.mail import send_mail



# Create your views here.

class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']
        if not str(username).isalnum():
            return JsonResponse({'username_error': 'username should only contain alphanumerical characters'},
                                status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error': 'username already taken'}, status=409)
        return JsonResponse({'username_valid': True})


class EmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        if not validate_email(email):
            return JsonResponse({'email_error': 'Email is not valid'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'Email already taken'}, status=409)
        return JsonResponse({'email_valid': True})


class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        context = {
            'fieldValues': request.POST
        }
        if not User.objects.filter(username=username).exists():
            if not User.objects.filter(email=email).exists():
                if len(password) >= 8:
                    # user = User.objects.create_user(username=username, email=email)
                    # user.set_password(password)
                    # user.is_active = False
                    # user.save()
                    email_subject = 'Activate your account'
                    email_body = 'hello'

                    send_mail(
                        email_subject,
                        email_body,
                        "amirdjangotestmail@gmail.com",
                        [email],
                        fail_silently=False,
                    )

                    messages.success(request, 'User created successfully')
                    return render(request, 'authentication/register.html')
                else:
                    messages.error(request, 'Password must be more than 6 characters!')
                    return render(request, 'authentication/register.html', context)
            else:
                messages.error(request, 'Email already taken!', context)
                return render(request, 'authentication/register.html')
        else:
            messages.error(request, 'Username already taken!')
            return render(request, 'authentication/register.html', context)
