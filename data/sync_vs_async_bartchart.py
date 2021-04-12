import matplotlib.pyplot as plt; plt.rcdefaults()
import matplotlib.pyplot as plt
import statistics

objects = ('sync (requests)', 'async (aiohttp)')
y_pos = list(range(len(objects)))

# 20 requests using requests-package (synchronous code)
sync_measurements = [2.76, 2.89, 2.85]
mean_sync_perf = 20/statistics.mean(sync_measurements)
print("mean sync performance:", round(mean_sync_perf, 2))

# 20 requests using aiohttp-package (asynchronous code)
async_measurements = [1.69, 1.78, 1.05]
mean_async_perf = 20/statistics.mean(async_measurements)
print("mean async performance:", round(mean_async_perf, 2))

performance = [mean_sync_perf,mean_async_perf]

my_colors = 'yg' 

plt.bar(
    y_pos,
    performance, 
    align='center', 
    alpha=0.5,
    color=my_colors,
    )

plt.xticks(y_pos, objects)
plt.ylabel('requests per second')
plt.title('Load Test')

# plt.show()

plt.savefig("sync_vs_async_load.svg")
