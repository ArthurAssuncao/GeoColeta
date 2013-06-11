from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'moduloColeta.views.home', name='home'),
    url(r'^home$', 'moduloColeta.views.home',),
    url(r'^medias/(.*)$', 'django.views.static.serve', {'document_root':settings.MEDIA_ROOT}),

    # Facebook
    (r'^facebook/', include('django_facebook.urls')),

    url(r'^mapa$', 'moduloColeta.views.mapa'),
    url(r'^coletas$', 'moduloColeta.views.coletas'),

    # url(r'^geocoleta/', include('geocoleta.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^app/', include('app.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
)

if settings.MODE == 'userena':
    urlpatterns += patterns('',
                            (r'^accounts/', include('userena.urls')),
                            )
elif settings.MODE == 'django_registration':
    urlpatterns += patterns('',
                            (r'^accounts/', include(
                                'registration.backends.default.urls')),
                            )


if settings.DEBUG:
    urlpatterns += patterns('',
                            url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT,
                                }),
                            )
